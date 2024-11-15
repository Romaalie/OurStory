import axios from 'axios';
import { retrieveDropboxToken } from '../exposecurestore/securestoreActions';

// THIS BASE WAS CREATED BY CHATGPT

// Does this need additional error handling?


export async function getTemporaryLink(dropboxPath: string): Promise<string | null> {
    try {
        const DROPBOX_ACCESS_TOKEN = await retrieveDropboxToken();
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