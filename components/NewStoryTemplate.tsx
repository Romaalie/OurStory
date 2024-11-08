import { Story } from "@/types/story";
import { Page } from "@/types/page";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

export default function NewStoryTemplate() {

    const [page, setPage] = useState<Page>({ bgImageUrl: "", textBoxContent: "" })
    const [story, setStory] = useState<Story>({ pages: [] });

    const addPage = (newPage: Page) => {
        setStory(prevStory => ({
            ...prevStory,
            pages: [...prevStory.pages, newPage]
        }));
    };

    const changePageTextBoxContent = (newText: string) => {
        setPage(prevPage => ({
            ...prevPage,
            textBoxContent: newText
        }));
    };

    // For debugging, remove when not needed
    /*     
        useEffect(() => {
            console.log(page);
        }, [page]);
     */
    return (
        <View>
            {/*
                Button for completing story.
                Should ask for confirmation.
                (preview feature?)
                onsubmit should send stuff to firebase. Figure out the handling of images there.
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
            <TouchableOpacity>
                <Text>
                    Add image
                </Text>
                <Icon name="pluscircle" />
            </TouchableOpacity>


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
                onChangeText={changePageTextBoxContent}
                placeholder="There is a multiline textbox here. Need to contain it."
            />
            {/* For user guidance. Style it. */}
            <Text>{50 - page.textBoxContent.length} characters remaining</Text>

            {/* Show guiding plus icon if there is no content. Reposition icon or something though. */}
            {
                !page.textBoxContent ? (
                <Icon name="pluscircle" />
                ) : null
            }

        </View>
    )
}