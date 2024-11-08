import { Story } from "@/types/story";
import { Page } from "@/types/page";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { useState } from "react";

export default function StoryTemplate() {

    const [story, setStory] = useState<Story>({ pages: [] });

    const addPage = (newPage: Page) => {
        setStory(prevStory => ({
            ...prevStory,
            pages: [...prevStory.pages, newPage]
        }));
    };



    return (
        <View>
            {/* Button for completing story. */}
            <TouchableOpacity>
                <Text>
                    End/Complete Story
                </Text>
            </TouchableOpacity>

            {/*
                Button for adding a background image/taking a picture.
                Maybe create a separate component for modal asking to select gallery or use camera.
                Or utilize an alert. Anyhow functionality in another component.
            */}
            <TouchableOpacity>
                <Text>
                    Add picture
                </Text>
            </TouchableOpacity>

            {/* Button for adding the text. Should open a text input. */}
            <TouchableOpacity>
                <Text>
                    Add text
                </Text>
            </TouchableOpacity>

        </View>
    )
}