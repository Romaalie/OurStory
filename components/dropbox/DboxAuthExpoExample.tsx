import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, Platform, Text } from 'react-native';

// THIS COMPONENT IS AN ATTEMPT TO ENABLE DROPBOX AUTOMATIC TOKEN RETRIEVAL USING AN EXPO EXAMPLE
// https://docs.expo.dev/guides/authentication/#dropbox

// Make sure to call this method to complete auth sessions correctly
WebBrowser.maybeCompleteAuthSession();

// Dropbox OAuth 2.0 endpoints
const discovery = {
    authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
    tokenEndpoint: 'https://www.dropbox.com/oauth2/token',
};

export default function DboxAuthExpoExample() {
    const [token, setToken] = useState(null);
    const [error, setError] = useState<string>();

    // Prepare the authentication request
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_DROPBOX_APP_KEY ?? '',  // Replace with your Dropbox client ID
            scopes: [],  // Dropbox does not require specific scopes
            redirectUri: makeRedirectUri({
                scheme: 'https://ourstory://redirect',  // Same as your redirect URI
            }),
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;  // Authorization code from Dropbox

            // Step 2: Exchange the authorization code for an access token
            fetch('https://api.dropbox.com/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code,  // The authorization code
                    grant_type: 'authorization_code',  // Grant type for exchanging the code
                    client_id: process.env.EXPO_PUBLIC_DROPBOX_APP_KEY ?? '',  // Replace with your Dropbox client ID
                    client_secret: process.env.EXPO_PUBLIC_DROPBOX_APP_SECRET ?? '',  // Replace with your Dropbox client secret
                    redirect_uri: makeRedirectUri({
                        scheme: 'https://ourstory://redirect',  // Same as your redirect URI
                    }),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.access_token) {
                        setToken(data.access_token);  // Store the access token
                    } else {
                        console.log('Data:', data)
                        setError('Failed to retrieve access token');
                    }
                })
                .catch((err) => setError(`Error: ${err.message}`));
        }
    }, [response]);
    console.log(makeRedirectUri({
        scheme: 'https://ourstory://redirect',
    }),);
    return (
        <>
            <Button
                disabled={!request}
                title="Login with Dropbox"
                onPress={() => {
                    promptAsync();  // Start the OAuth flow
                }}
            />
            {token ? (
                <Button title="Access Token Received!" onPress={() => console.log(token)} />
            ) : (
                <Button title="No Token Yet" disabled />
            )}
            {error && <Text>{error}</Text>}
        </>
    );
}
