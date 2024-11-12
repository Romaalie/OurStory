import axios from 'axios';
import * as FileSystem from 'expo-file-system';

//THIS BASE WAS CREATED BY CHATGPT

// This solution was reached because there were unknown issues utilizing photo.base64 from the Camera component.
// See DboxUploadDepr.tsx for one of the old versions

// Change to expo secure-store if time
const DROPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_DROPBOX_ACCESS_TOKEN;

export async function uploadImageToDropbox(imageUri: string, dropboxPath: string): Promise<string | null> {
    console.log('Preparing to upload image to Dropbox...');

    try {
        console.log('DropBox Path:', dropboxPath);
        console.log('Image URI:', imageUri);

        // Check if the file exists at the URI
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        if (!fileInfo.exists) {
            console.error('File does not exist at the specified URI:', imageUri);
            return null;
        }

        // Read the file content as a base64 encoded string
        const fileBase64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Convert the base64 string to binary data using atob and Uint8Array
        const binaryString = atob(fileBase64); // Decode base64 string into binary
        const fileBlobData = new Uint8Array(binaryString.length); // Create a Uint8Array of the right size

        // Populate the Uint8Array with the binary string's character codes
        for (let i = 0; i < binaryString.length; i++) {
            fileBlobData[i] = binaryString.charCodeAt(i);
        }

        // Log the Blob content type and size
        console.log('File Blob type:', 'image/jpeg');  // Assuming it's a JPEG image
        console.log('File Blob size:', fileBlobData.length);  // Ensure it's not 0

        // Upload to Dropbox
        const uploadResponse = await axios.post(
            'https://content.dropboxapi.com/2/files/upload',
            fileBlobData,
            {
                headers: {
                    'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                    'Content-Type': 'application/octet-stream',  // For binary content
                    'Dropbox-API-Arg': JSON.stringify({
                        path: dropboxPath,
                        mode: 'add',
                        autorename: true,
                        mute: false,
                    }),
                },
            }
        );

        // Success response
        console.log('Successfully uploaded to Dropbox:', uploadResponse.data);
        return uploadResponse.data.path_lower;
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error.message || error);
        return null;
    }
}
