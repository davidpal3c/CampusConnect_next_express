/**
 * 
 * @param {File} file - The original image file. 
 * @returns {Promise<string>} A promise that resolves with the base64 string of the image.
 */
export const fileToBase64 = async(file: File | Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!(file instanceof File || file instanceof Blob)) {
            console.log("file is not instance of File or Blob");
            reject(new Error('Invalid file type'));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log("reader result", reader.result);
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
}


/**
 * Compress an image file using an off-screen canvas.
 * @param {File} file - The original image file.
 * @param {Object} [options] - Compression options.
 * @param {number} [options.maxDimension=1024] - Maximum width or height (in pixels).
 * @param {number} [options.quality=0.7] - JPEG quality (0 to 1, where 1 is highest quality).
 * @returns {Promise<Blob>} A promise that resolves with a compressed image Blob.
 */
export const compressImage = (file: File, options: { maxDimension?: number; quality?: number } = {}) => {
    return new Promise((resolve, reject) => {

        // Default options
        const maxDimension = options.maxDimension || 1024;
        const quality = options.quality || 0.7;
    
        // Use FileReader to convert image to a data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = (event: any) => {
          const img = new Image();
          img.src = event.target.result;
    
          img.onload = () => {
            // Calculate new dimensions while preserving aspect ratio
            let { width, height } = img;
            if (width > height) {
              if (width > maxDimension) {
                height = Math.round(height * (maxDimension / width));
                width = maxDimension;
              }
            } else {
              if (height > maxDimension) {
                width = Math.round(width * (maxDimension / height));
                height = maxDimension;
              }
            }
    
            // Create an off-screen canvas and draw the image into it
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            
            const ctx: any = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
    
            // Convert canvas content to Blob (JPEG format)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error("Image compression failed, no blob returned."));
                }
              },
              "image/jpeg",
              quality
            );
          };
    
          img.onerror = () => reject(new Error("Failed to load image for compression."));
        };
    
        reader.onerror = (error) => reject(error);
    });
}


//compress image if above 5MB 