

// export const uploadImage = async(file: File) => {
//     try {
//         const response = await fetch('')
//     } catch (error) {
        
//     }
// };

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



//compress image if above 5MB 