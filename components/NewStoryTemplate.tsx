import { Story } from "@/types/story";
import { Page } from "@/types/page";
import { Text, TextInput, View, TouchableOpacity, Modal, ImageBackground, Alert } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import { Camera } from '@/components/expocamera/Camera'


export default function NewStoryTemplate() {

    const [localImage, setLocalImage] = useState<string>('');
    const [imageUri, setImageUri] = useState<string>(''); // Don't know what I am doing with this right now
    const [page, setPage] = useState<Page>({ bgImageDboxPath: "", textBoxContent: "" })
    const [story, setStory] = useState<Story>({ id: '', name: '', pages: [] });

    const [showCamera, setShowCamera] = useState(false);

    const handleSavePhoto = ({ localImage, dropboxPath }: { localImage: string, dropboxPath: string }) => {
        setImageUri(dropboxPath);
        setLocalImage(localImage);
        setPage(prevPage => ({ ...prevPage, bgImageDboxPath: dropboxPath }));
        setShowCamera(false);
        //console.log(dropboxPath);
    };

    const addPage = () => {

        if (!page.textBoxContent || !page.bgImageDboxPath) {
            Alert.alert(
                "Incomplete Page",
                "Please add both text and a background image before trying to add a new page.",
                [{ text: "OK" }]
            );
            return;
        }
        setStory(prevStory => ({
            ...prevStory,
            pages: [...prevStory.pages, page]
        }));
        setPage({ bgImageDboxPath: "", textBoxContent: "" })
        setLocalImage('');
    };

    const endStoryChecks = () => {
        if (!story.pages || story.pages.length === 0) {
            Alert.alert(
                "Incomplete Story",
                "There are no pages in your story. Please add at least one page.",
                [{ text: "OK"}]
            );
            return;
        }
        if (story.pages.length <= 3) {
            Alert.alert(
                "Short story",
                "There are three or fewer pages in your story. Are you sure you want to end it?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => {endStory}
                    }
                ],
                { cancelable: true }
            );
            return;
        }
        endStory();
    }

    const endStory = () => {
        // Save story to firebase                       
    }

    // For debugging, remove when not needed
    /*     
        useEffect(() => {
            console.log(page);
        }, [page]);
     */
    return (
        <View>
            {
                localImage ? (
                    <ImageBackground
                        source={{ uri: localImage }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            zIndex: -1
                        }}
                    />
                ) : null
            }
            {/*
                Button for completing story.
                Give a name to your story.
                Should ask for confirmation.
                (preview feature?)
                After confirmation should send stuff to firebase and dropbox.
                Move to previous screen?            
            */}
            <TouchableOpacity
            onPress={endStoryChecks}>
                <Text>
                    End/Complete Story
                </Text>
                <Icon name="checkcircle" />
            </TouchableOpacity>

            {/*
                Button for adding a background image/taking a picture.
                Maybe create a separate component for modal asking to select gallery or use camera.
                Or utilize an alert. Anyhow functionality in another component.
            */}
            <TouchableOpacity
                onPress={() => setShowCamera(true)}>
                {!localImage ? (
                    <Text>
                        Add background image
                    </Text>
                ) :
                    <Text>
                        Change background image
                    </Text>
                }
                <Icon name="pluscircle" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={showCamera}
                onRequestClose={() => setShowCamera(false)}
            >
                <Camera onClose={() => setShowCamera(false)} onSavePhoto={handleSavePhoto} />
            </Modal>

            {/*
                Remember to set the image as background.
            */}


            {/*
                Button for adding another page to the story.
                Ask for confirmation?
                Check if textbox is empty or there is no image?
                Position to the right of add image, so put them in a flex horizontal view?                
            */}
            <TouchableOpacity
                onPress={addPage}>
                <Text>
                    Next page
                </Text>
                <Icon name="arrowright" />
            </TouchableOpacity>

            {/*
                TextInput for adding text to the Page.
                Wrap in a view to limit width.
            */}
            <TextInput
                value={page.textBoxContent}
                editable
                multiline
                numberOfLines={5}
                maxLength={50}
                onChangeText={text => setPage({ ...page, textBoxContent: text })}
                placeholder="There is a multiline textbox here. Need to contain it."
            />
            {/* Show guiding plus icon if there is no content. Reposition icon or something though. */}
            {
                !page.textBoxContent ? (
                    <Icon name="pluscircle" />
                ) : null
            }
            {/* For user guidance. Style it. */}
            <Text>{50 - page.textBoxContent.length} characters remaining</Text>



        </View>
    )
}