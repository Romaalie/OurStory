import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Text, Modal, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { saveToFilesystem } from '../filesystem/filesystemActions';
import { uploadImageToDropbox } from '../dropbox/DboxUpload';


export function Camera({ onClose, onSavePhoto}: {
    onClose: () => void;
    onSavePhoto: (localImageUri: string, userGivenName: string) => void;

}) {

    // Check the types for these
    const [photoName, setPhotoName] = useState<string>('');
    const [photoBase64, setPhotoBase64] = useState<string>(''); // Currently unused?
    const [permission, requestPermission] = useCameraPermissions();

    const [userGivenName, setUserGivenName] = useState<string>('');
    const [savingModalVisible, setSavingModalVisible] = useState<boolean>(false);

    // Have not figured out the typing problem for this
    // See IDE error for .takePictureAsync below
    const camera = useRef(null);


    const snap = async () => {
        if (camera.current) {
            const photo = await camera.current.takePictureAsync({ base64: true });
            setPhotoName(photo.uri);
            setPhotoBase64(photo.base64);
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
            setPhotoBase64('');
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
            <View>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView style={{ flex: 1, minWidth: "100%" }} ref={camera} />
            <Button title="Take Photo" onPress={snap} />
            <Button title="Cancel" onPress={onClose} />

            <Modal
                visible={savingModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSavingModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Photo Name</Text>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 20,
                                paddingLeft: 10,
                            }}
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