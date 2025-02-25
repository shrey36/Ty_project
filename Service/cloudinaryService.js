import mime from 'mime';
import { cloudinaryConfig } from './../Config/cloudinaryConfig';

export const uploadToCloudinary = async (fileUri) => {
    const newImageUri = "file:///" + fileUri.split("file:/").join("");
    const data = new FormData();

    data.append('file', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop()
    });

    data.append('upload_preset', cloudinaryConfig.uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
            {
                method: 'POST',
                body: data,
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
