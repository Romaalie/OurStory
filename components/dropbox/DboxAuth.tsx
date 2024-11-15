import React from 'react';
import { WebView } from 'react-native-webview';

/* Concerning usage of WebView:
Your app should send the user to this app authorization page in their system browser, which will display the permissions being granted.
If the user isn't already signed in to the Dropbox website, they will be prompted to do so on this web page.
This web page should not be displayed in a web-view.
This is in order to maintain compatibility with the website and to comply with Google's policy against processing their OAuth flow inside a web-view,
to support users who sign in to Dropbox using their Google accounts.
Learn about the dropbox.com system requirements.
https://www.dropbox.com/developers/documentation/http/documentation#oauth2-token
https://developers.googleblog.com/en/modernizing-oauth-interactions-in-native-apps-for-better-usability-and-security/
*/

interface DboxAuthOptions {
  codeChallenge: string;
  onAuthCodeReceived: (authCode: string) => void;
  onAuthError?: (error: Error) => void;
  onClose?: () => void; // Callback for WebView closure
}

export const DboxAuth = ({ codeChallenge, onAuthCodeReceived, onAuthError, onClose }: DboxAuthOptions) => {

  const DROPBOX_CLIENT_ID = process.env.EXPO_PUBLIC_DROPBOX_APP_KEY ?? '';
  const DROPBOX_REDIRECT_URI = process.env.EXPO_PUBLIC_DROPBOX_REDIRECT_URI ?? '';
  const DROPBOX_AUTH_URL = `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_CLIENT_ID}&redirect_uri=${DROPBOX_REDIRECT_URI}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  console.log("Code challenge at auth:", codeChallenge)

  const handleWebViewNavigationStateChange = (navState: any) => {
    const { url } = navState;
    console.log("WebView URL:", url); // Log the URL for debugging
    if (url.startsWith(DROPBOX_REDIRECT_URI)) {
      const code = new URL(url).searchParams.get('code');
      if (code) {
        console.log("Authorization code reveived:", code)
        onAuthCodeReceived(code); // Send auth code back to parent
      } else {
        onAuthError?.(new Error('Authorization code not found in redirect URL'));
      }
      onClose?.(); // Close WebView when done
    }
  };
  const handleWebViewError = (error: any) => {
    console.log("WebView error:", error); // Log the error to see what went wrong
    onAuthError?.(new Error(`WebView Error: ${error.nativeEvent.description}`));
  };

  return (
    <WebView
      source={{ uri: DROPBOX_AUTH_URL }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      onError={handleWebViewError}
    />
  );
};

export default DboxAuth;
