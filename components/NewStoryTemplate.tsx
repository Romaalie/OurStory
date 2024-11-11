import { Story } from "@/types/story";
import { Page } from "@/types/page";
import { Text, TextInput, View, TouchableOpacity, Modal, ImageBackground } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import { Camera } from '@/components/expocamera/Camera'


export default function NewStoryTemplate() {

    const [imageUri, setImageUri] = useState<string>('');
    const [page, setPage] = useState<Page>({ bgImageUrl: "", textBoxContent: "" })
    const [story, setStory] = useState<Story>({ id: '', name: '', pages: [] });

    const [showCamera, setShowCamera] = useState(false);

    const handleSavePhoto = (uri: string) => {
        setImageUri(uri);  // Update the URI to be used in the page's background
        setPage(prevPage => ({ ...prevPage, bgImageUrl: uri }));
        setShowCamera(false);  // Close the camera after saving
    };

    const addPage = (newPage: Page) => {
        setStory(prevStory => ({
            ...prevStory,
            pages: [...prevStory.pages, newPage]
        }));
        setPage({ bgImageUrl: "", textBoxContent: "" })
    };

    // For debugging, remove when not needed
    /*     
        useEffect(() => {
            console.log(page);
        }, [page]);
     */
    return (
        <View>
            {
                imageUri ? (
                    <ImageBackground
                        source={{ uri: imageUri }}
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
            <TouchableOpacity>
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
                <Text>
                    Add image
                </Text>
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
            <TouchableOpacity>
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