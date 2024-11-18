import { useEffect, useState } from 'react';
import DboxAuth from './DboxAuth';
import { retrieveDropboxToken, saveDropboxToken } from '../exposecurestore/securestoreActions';
import { checkTokenValidity } from './DboxGetCurrentAccount';
import { View, Text, ActivityIndicator } from 'react-native';
import { generateCodeChallenge, generateCodeVerifier } from './DboxPKCE';
import { styles } from '@/styles/styles';

const DROPBOX_TOKEN_URL = 'https://api.dropbox.com/oauth2/token';
const DROPBOX_CLIENT_ID = process.env.EXPO_PUBLIC_DROPBOX_APP_KEY ?? '';
const DROPBOX_REDIRECT_URI = process.env.EXPO_PUBLIC_DROPBOX_REDIRECT_URI ?? '';

interface DboxGetTokenProps {
  onAuthComplete: (isSuccess: boolean) => void;
}

export const DboxGetToken = ({ onAuthComplete }: DboxGetTokenProps) => {

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [codeChallenge, setCodeChallenge] = useState<string>('');
  const [codeVerifier, setCodeVerifier] = useState<string>('');

  useEffect(() => {
    const fetchStoredToken = async () => {
      try {
        const storedToken = await retrieveDropboxToken();
        if (storedToken) {
          const validToken = await checkTokenValidity(storedToken);
          if (validToken) {
            console.log("Valid token found in storage.");
            onAuthComplete(true);
          }
          else {
            console.log("No valid token in storage. Requesting a new token.");
            const codeVerifier = await generateCodeVerifier();
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            if (codeChallenge && codeVerifier) {
              setCodeChallenge(codeChallenge);
              setCodeVerifier(codeVerifier);
              console.log("Setting authenticating to true.")
              setIsAuthenticating(true);
            }
            else {
              console.error("Problem generating code challenge.")
            }
          }
        }
        else {
          console.log("No token found in storage. Requesting a new token...");
          handleGetNewToken();
        };
      }
      catch (error) {
        console.error("Error fetching token from secure storage!");
      }
    };
    fetchStoredToken();
  }, []);

  const handleGetNewToken = async () => {
    try {
      const codeVerifier = await generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      if (codeChallenge && codeVerifier) {
        setCodeChallenge(codeChallenge);
        setCodeVerifier(codeVerifier);
        console.log("code challenge at getToken:", codeChallenge);
        console.log("code verifier at getToken:", codeVerifier)
        console.log("Setting authenticating to true.")
        setIsAuthenticating(true);
      }
      else {
        console.error("Problem generating code challenge.")
      }
    }
    catch (error) {
      console.error("Error getting a new token", error)
    }
  }


  const handleAuthCodeReceived = async (authCode: string) => {
    try {
      const token = await exchangeAuthCodeForToken(authCode);
      if (token) {
        console.log("New token retrieved successfully. Saving token...")
        saveDropboxToken(token);
        onAuthComplete(true);
        setIsAuthenticating(false);
      }
      else {
        console.log("Failed to retrieve a new token. Returned an empty string.")
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
      setIsAuthenticating(false);
    }
  };

  const exchangeAuthCodeForToken = async (authCode: string): Promise<string> => {
    try {
      console.log("Exchanging auth code for token...");
      const params = {
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: DROPBOX_REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: DROPBOX_CLIENT_ID
      };
      console.log("Request Body (as JSON-like):", JSON.stringify(params, null, 2));

      const urlParams = new URLSearchParams(params);

      console.log('Request Body (URLSearchParams):', urlParams.toString());

      console.log('Request Body:', JSON.stringify(urlParams));

      const response = await fetch(DROPBOX_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlParams.toString(),
      });

      const responseText = await response.text();
      console.log("Dropbox API Response2:", responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        console.log("Dropbox API Response2:", data);
        if (data.access_token) {
          return data.access_token;
        } else {
          throw new Error('Access token not found in response');
        }
      } else {
        const errorData = JSON.parse(responseText);
        console.error("Error:", errorData.error_description || 'Unknown error');
        throw new Error(errorData.error_description || 'Failed to exchange auth code for token');
      }
    }
    catch (error) {
      console.error("Error exchanging auth code for token.")
      return '';
    }
  };

  return (
    isAuthenticating ? (
      <DboxAuth
        onAuthCodeReceived={handleAuthCodeReceived}
        codeChallenge={codeChallenge}
      />
    ) : (<View style={styles.containerBasicCentered}>
      <Text> Handling authentication to dropbox </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    )
  )
};
