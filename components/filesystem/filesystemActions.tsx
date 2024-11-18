import * as FileSystem from 'expo-file-system';
import { FileSaverProps } from '@/types/filesaverprops';

// Should probably add more actions for delete, and get...

export const saveToFilesystem = async ({ fromUri, toUri}: FileSaverProps) => {
    //console.log('Saving file from:', fromUri, 'to:', toUri);

    const saveFile = async () => {
        try {
            await FileSystem.copyAsync({
                from: fromUri,
                to: toUri,
            });
            console.log('File saved successfully to:', toUri);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };

    saveFile();
};