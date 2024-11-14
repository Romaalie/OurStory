import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import { ImageBackground, View, Text, Modal, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { getTemporaryLink } from "@/components/dropbox/DboxGetTempLink";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "@/styles/styles";


export default function OurStory() {

    const router = useRouter();
    const { story: storyString } = useLocalSearchParams<{ story: string }>();
    const story: Story = storyString ? JSON.parse(storyString) : null;

    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [showEndStoryModal, setShowEndStoryModal] = useState<boolean>(false);

    const getImage = async () => {
        // If this is slow, maybe save images temporarily to local?
        try {
            const imageFromDBox = await getTemporaryLink(story.pages[pageIndex].bgImageDboxPath);
            // Figure out better test/conditionals for this?
            if (imageFromDBox != null) {
                setBackgroundImage(imageFromDBox);
            }
        }
        catch (error) {
            console.log("Error fetching background image from dropbox: ", error)
        }
    }

    const nextPage = () => {
        if (pageIndex >= story.pages.length - 1) {
            // Add options to view it again or return to list. Or create a new one?
            setShowEndStoryModal(true);
            return;
        }
        setPageIndex(prevIndex => prevIndex + 1);
    }

    useEffect(() => {
        if (story && story.pages && story.pages[pageIndex]) {
            getImage();
        }
    }, [story, pageIndex]);


    return (
        <View>
            <ImageBackground
                source={backgroundImage ? { uri: backgroundImage } : undefined}
                style={styles.backgroundWithImage}
            >
                {backgroundImage ? null : (
                    // Placeholder content when no background image is set
                    // Doesn't work as intended. Still a long break between showing this and the actual image rendering.
                    <View style={styles.containerBackgroundWhite}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
            </ImageBackground>

            <View>
                <Text>{story.name}</Text>

                <Text>{story.pages[pageIndex]?.textBoxContent}</Text>
            </View>

            <TouchableOpacity
                onPress={nextPage}
            >
                <Text>Next Page</Text>
            </TouchableOpacity>
            <Modal
                style={styles.modalFullScreen}
                animationType="slide"
                transparent={false}
                visible={showEndStoryModal}
                onRequestClose={() => setShowEndStoryModal(false)}>
                <View style={styles.modalView}>
                    <Text style={styles.textStoryEnd}>This story has ended.</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShowEndStoryModal(false);
                            router.back();
                        }}
                    >
                        <Text>View other stories</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}