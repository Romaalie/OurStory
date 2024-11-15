const DROPBOX_VALIDATE_TOKEN_URL = 'https://api.dropboxapi.com/2/users/get_current_account';

export const checkTokenValidity = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(DROPBOX_VALIDATE_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    } catch (error) {
        console.error('Error validating Dropbox access token:', error);
        return false;
    }
};