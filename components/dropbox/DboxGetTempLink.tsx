import axios from 'axios';

// THIS BASE WAS CREATED BY CHATGPT

// Change to expo secure-store if time
const DROPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_DROPBOX_ACCESS_TOKEN;

/**
 * Fetches a temporary link for a file stored on Dropbox.
 * @param dropboxPath The path of the file on Dropbox, e.g., "/Apps/YourAppFolder/filename.jpg"
 * @returns The temporary link to the file, or null if there's an error
 */
export async function getTemporaryLink(dropboxPath: string): Promise<string | null> {
    try {
        const response = await axios.post(
            'https://api.dropboxapi.com/2/files/get_temporary_link',
            { path: dropboxPath },
            {
                headers: {
                    'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const temporaryLink = response.data.link;
        console.log('Temporary link retrieved:', temporaryLink);
        return temporaryLink;
    } catch (error) {
        console.error('Error retrieving temporary link from Dropbox:', error);
        return null;
    }
}