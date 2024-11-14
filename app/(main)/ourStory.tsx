import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import { ImageBackground, View, Text, Modal, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { getTemporaryLink } from "@/components/dropbox/DboxGetTempLink";
import { useLocalSearchParams, useRouter } from "expo-router";


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
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: -1
                }}
            >
                {backgroundImage ? null : (
                    // Placeholder content when no background image is set
                    // Doesn't work as intended. Still a long break between showing this and the actual image rendering.
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
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
                style={{ flex: 1, minWidth: "100%" }}
                animationType="slide"
                transparent={true}
                visible={showEndStoryModal}
                onRequestClose={() => setShowEndStoryModal(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Text>The story has ended.</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShowEndStoryModal(false);
                            router.back();
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}