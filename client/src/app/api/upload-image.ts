

// handles image upload to imgbb
export const uploadImage = async(file: File) => {

    let errorMessage = null;

    if (!file) {
        return null;
    }

    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        errorMessage = 'Only JPEG, PNG, GIF, or WebP images are allowed'
        console.error(errorMessage);
        return { error: errorMessage };
    }

    if (file.size > (5 * 1028 * 1028 * 4)) {
        errorMessage = 'Image must be smaller than 20MB.'
        return { error: errorMessage };
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();

        if(!response.ok) {
            console.log("Error uploading image: ", responseData);
            console.error("An error occurred uploading image");
            return { error: responseData.error?.message || 'Image upload failed' };
        }

        console.log("Image upload response: ", responseData)
        if (responseData.success) {
            return responseData.data.url;          
        } else {
            console.error(responseData.error?.message || 'Image upload failed');
            return { error: responseData.error?.message || 'Image upload failed' };
        }

    } catch (error) {
        console.log("Error: ", error);
        console.error("An unknown error occurred uploading image.");

        return null;
    }
}