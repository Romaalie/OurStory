import { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';

const DROPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_DROPBOX_ACCESS_TOKEN;

// The Base for this was created by ChatGpt.

export const DropboxAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accountInfo, setAccountInfo] = useState<any>(null);

    useEffect(() => {
        // Check if the token is valid by making an API call
        const checkAuthentication = async () => {
            try {
                const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });
                const response = await dbx.usersGetCurrentAccount();
                setAccountInfo(response);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error checking Dropbox authentication:', error);
                setIsAuthenticated(false);
                return (error)
            }
        };

        checkAuthentication();
    }, []);

    if (isAuthenticated) {
        return (
            true
        );
    } else {
        return (
            false
        );
    }
};
