import axios from 'axios';

// The base for this code was created by ChatGpt and it was modified by Ali Romar.
// This component is depracated and not working.
// It is saved here as reference material

// Change to expo secure-store if time
const DROPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_DROPBOX_ACCESS_TOKEN;

export async function uploadImageToDropbox(imageB64: string, dropboxPath: string): Promise<string | null> {
    console.log('Preparing to upload image to Dropbox...');

    console.log('Base64 string length:', imageB64.length);
    console.log('Base64 string (first 100 characters):', `data:image/jpeg;base64,${imageB64}`.slice(0, 100));

    try {
        console.log('DropBox Path:', dropboxPath);

        if (!imageB64 || imageB64.length === 0) {
            console.error('Base64 string is empty or invalid.');
            return null;
        }
        console.log('Attempting to fetch base64 string as a Blob...');

        const dataUri = `data:image/jpeg;base64,${imageB64}`;
        const response = await fetch(dataUri);

        if (!response.ok) {
            console.error('Failed to fetch base64 string:', response.statusText, response);
            return null;
        } else {
            console.log('Fetch successful:', response);
        }
        console.log('Fetch successful, converting to Blob...');
        const fileBlob = await response.blob(); // This will create a Blob from the base64 string
        console.log('Successfully converted base64 to Blob');

        // Check the Blob's content type and size for verification
        console.log('File Blob type:', fileBlob.type);  // Should be 'image/jpeg'
        console.log('File Blob size:', fileBlob.size);  // Ensure it's not 0


        console.log('Headers:', {
            'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
            'Content-Type': 'image/jpeg',
            'Dropbox-API-Arg': JSON.stringify({
                path: dropboxPath,
                mode: 'add',
                autorename: true,
                mute: false,
            }),
        });
        const uploadResponse = await axios.post(
            'https://content.dropboxapi.com/2/files/upload',
            fileBlob,
            {
                headers: {
                    'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                    'Content-Type': 'image/jpeg',
                    'Dropbox-API-Arg': JSON.stringify({
                        path: dropboxPath,
                        mode: 'add',
                        autorename: true,
                        mute: false,
                    }),
                },
            }
        );

        const uploadedFile = uploadResponse.data;
        console.log('Successfully uploaded to Dropbox:', uploadedFile);
        return uploadedFile.path_lower;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error uploading file to Dropbox:', error.response?.data || error.message);
        } else {
            console.error('Error uploading file to Dropbox:', error);
        }
        return null;
    }
}