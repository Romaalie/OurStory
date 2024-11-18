import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import { ImageBackground, View, Text, Modal, Animated } from "react-native";
import { TouchableOpacity } from "react-native";
import { getTemporaryLink } from "@/components/dropbox/DboxGetTempLink";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "@/styles/styles";
import { useTitle } from "@/components/TitleContext";
import Icon from "react-native-vector-icons/AntDesign";


export default function OurStory() {

    const { setTitle } = useTitle();

    const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity is 0

    // For passing the story from storyList.tsx
    const router = useRouter();
    const { story: storyString } = useLocalSearchParams<{ story: string }>();
    const story: Story = storyString ? JSON.parse(storyString) : null;

    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [showEndStoryModal, setShowEndStoryModal] = useState<boolean>(false);

    const getImage = async (pageIndex: number) => {
        try {
            const imageFromDBox = await getTemporaryLink(story.pages[pageIndex].bgImageDboxPath);
            // Figure out better test/conditionals for this?
            if (imageFromDBox) {
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
        triggerFadeOut();

        const nextIndex = pageIndex + 1;
        // Delay updating the image and triggering fade-in until fade-out completes
        setTimeout(() => {
            if (story.pages[nextIndex]) {
                getImage(nextIndex).then(() => {
                    setPageIndex(nextIndex); // Update the page index after the image is loaded
                });
            }
        }, 4000); // Match this duration to the fade-out animation
    };

    useEffect(() => {
        if (story.pages[0]) {
            getImage(0);
            console.log('Use effect triggered on pageIndex, debug');
        }
    }, []);

    // Set custom title
    useEffect(() => {
        setTitle(story.name + ': page ' + (pageIndex + 1) + '/' + story.pages.length);
    }, [setTitle, pageIndex]);

    // For fade animation
    const triggerFadeIn = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    };

    const triggerFadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 4000, // Adjust duration to your liking
            useNativeDriver: true,
        }).start();
    };


    return (
        <Animated.View style={[styles.containerBasicCentered, { opacity: fadeAnim }]}>
            {
                backgroundImage ? (
                    <ImageBackground
                        source={{ uri: backgroundImage }}
                        style={styles.backgroundWithImage}
                        onLoadEnd={() => triggerFadeIn()}
                    />
                ) :
                    <ImageBackground
                        style={styles.backgroundLightGreen}
                    />
            }
            {/* Style lower */}
            <View style={styles.containerOurStory}>
                <Text style={styles.textStoryContent}>{story.pages[pageIndex]?.textBoxContent}</Text>
            </View>

            {/* Style to the bottom or left? */}
            <TouchableOpacity
                style={styles.containerBasicCentered}
                onPress={() => {
                    nextPage();
                }}
            >
                {(pageIndex + 1) == story.pages.length ? (
                    <Text style={styles.textStoryContent}>End story</Text>
                ) :
                    <View style={styles.containerNewStoryButtonsRow}>
                        <Text style={styles.textStoryContent}>Next Page</Text>
                        <Icon
                            style={styles.iconMargin}
                            name="arrowright" />
                    </View>
                }
            </TouchableOpacity>
            <Modal
                style={styles.modalFullScreen}
                animationType="slide"
                transparent={false}
                visible={showEndStoryModal}
                onRequestClose={() => setShowEndStoryModal(false)}
            >
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
        </Animated.View>
    );
}