import * as SecureStore from 'expo-secure-store';


// Token

export const saveDropboxToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('dropbox_token', token);
    console.log('Token saved securely.');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const retrieveDropboxToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('dropbox_token');
    if (token) {
      console.log('Token found:', token);
      return token;
    } else {
      console.log('No token stored');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const deleteDropboxToken = async () => {
  try {
    await SecureStore.deleteItemAsync('dropbox_token');
    console.log('Token deleted securely.');
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

// Client id NOT USED CURRENTLY

export const saveDropboxClientId = async (clientId: string) => {
  try {
    await SecureStore.setItemAsync('dropbox_client_id', clientId);
        console.log('Client Id saved securely.');
  } catch (error) {
    console.error('Error saving client id:', error);
  }
};

// Client secret NOT USED CURRENTLY

export const saveDropboxClientSecret = async (clientSecret: string) => {
  try {
    await SecureStore.setItemAsync('dropbox_client_secret', clientSecret);
        console.log('Client secret saved securely.');
  } catch (error) {
    console.error('Error saving client secret:', error);
  }
};
