import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Text, Modal, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { saveToFilesystem } from '../filesystem/filesystemActions';
import { styles } from '@/styles/styles';


export function Camera({ onClose, onSavePhoto }: {
    onClose: () => void;
    onSavePhoto: (localImageUri: string, userGivenName: string) => void;

}) {
    // Currently unused?
    //const [photoBase64, setPhotoBase64] = useState<string>(''); 

    const [permission, requestPermission] = useCameraPermissions();
    const [photoName, setPhotoName] = useState<string>('');
    const [userGivenName, setUserGivenName] = useState<string>('');
    const [savingModalVisible, setSavingModalVisible] = useState<boolean>(false);

    // Have not figured out the typing problem for this
    // See IDE error for .takePictureAsync below
    const camera = useRef(null);


    const snap = async () => {
        if (camera.current) {
            const photo = await camera.current.takePictureAsync({ base64: true });
            setPhotoName(photo.uri);
            //setPhotoBase64(photo.base64);
            setSavingModalVisible(true);
        }
    };

    const closeCamera = () => {
        onClose();
    }

    const save = async () => {
        try {
            const permanentUri = FileSystem.documentDirectory + userGivenName;
            // Add error handling?
            await saveToFilesystem({
                fromUri: photoName,
                toUri: permanentUri
            });
            onSavePhoto(permanentUri, userGivenName);
            setPhotoName('');
            //setPhotoBase64('');
            setSavingModalVisible(false);
            closeCamera();
        }
        catch (error) {
            console.error('Error in save function: ', error);
        }
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.containerBasicCentered}>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.containerBasicCentered}>
            <CameraView style={styles.containerCameraView} ref={camera} />
            <Button title="Take Photo" onPress={snap} />
            <Button title="Cancel" onPress={onClose} />

            <Modal
                visible={savingModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSavingModalVisible(false)}
            >
                <View style={styles.containerCameraNamePic}>
                    <View style={styles.containerCameraNamePicInner}>
                        <Text style={styles.textCameraNamePic}>Enter Photo Name</Text>
                        <TextInput
                            style={styles.textInputCameraNamePic}
                            placeholder="Enter name for photo"
                            value={userGivenName}
                            onChangeText={setUserGivenName}
                        />
                        <Button title="Save" onPress={save} />
                        <Button title="Cancel" onPress={() => setSavingModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/** 
             * 
             * Old version. Here for safekeeping.
             * 
            <View style={{ flex: 1 }}>
                {photoName && photoBase64 ? (
                    <>
                        <Image style={{ flex: 1 }} source={{ uri: `data:image/jpg;base64,${photoBase64}` }} />
                        <Button title="Save photo" onPress={save} />
                    </>
                ) : (
                    <Text>No photo taken yet.</Text>
                )}
            </View>

            **/}
        </View>
    );

}