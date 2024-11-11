import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { Dropbox } from 'dropbox';
import * as FileSystem from 'expo-file-system';

const DROPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_DROPBOX_ACCESS_TOKEN;

// The Base for this was created by ChatGpt.

export const DropboxUploader = ({
    fileUri,
    fileName,
    onUploadComplete,
}: {
    fileUri: string;
    fileName: string;
    onUploadComplete: (message: string) => void;
}) => {
    const uploadToDropbox = async () => {
        try {
            const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });
            const file = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const response = await dbx.filesUpload({
                path: `/Apps/YourAppFolder/${fileName}`,
                contents: file,
            });

            console.log('File uploaded:', response);

            // Create a shared link
            const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
                path: response.result.path_lower, // path_lower contains the exact path to the uploaded file
            });

            const fileUrl = linkResponse.result.url; // The URL for the uploaded file
            onUploadComplete(`File uploaded to Dropbox: ${fileUrl}`);
        } catch (error) {
            console.error('Upload Error:', error);
            onUploadComplete('Error uploading file');
        }
    };
};
