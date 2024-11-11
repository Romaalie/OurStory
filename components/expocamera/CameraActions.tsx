import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Text, Image } from 'react-native';


export function CameraActions({ onClose }: { onClose: () => void}) {

    const [photoName, setPhotoName] = useState('');
    const [photoBase64, setPhotoBase64] = useState('');
    const [permission, requestPermission] = useCameraPermissions();

    // Have not figured out the typing problem for this
    // See IDE error for .takePictureAsync below
    const camera = useRef(null);

    const snap = async () => {
        if (camera.current) {
            const photo = await camera.current.takePictureAsync({ base64: true });
            setPhotoName(photo.uri);
            setPhotoBase64(photo.base64);
        }
    };

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
            <View style={{ flex: 1 }}>
                {photoName && photoBase64 ? (
                    <>
                        <Image style={{ flex: 1 }} source={{ uri: photoName }} />
                        <Image style={{ flex: 1 }} source={{ uri: `data:image/jpg;base64,${photoBase64}` }} />
                    </>
                ) : (
                    <Text>No photo taken yet.</Text>
                )}
            </View>
        </View>
    );

}