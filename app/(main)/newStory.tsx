import { Story } from "@/types/story";
import { Page } from "@/types/page";
import { Text, TextInput, View, TouchableOpacity, Modal, ImageBackground, Alert, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import { Camera } from '@/components/expocamera/Camera'
import * as firebase from '@/components/firebase/firebaseActions'
import { styles } from "@/styles/styles";
import { uploadImageToDropbox } from "@/components/dropbox/DboxUpload";
import { router } from "expo-router";
import { useTitle } from "@/components/TitleContext";



export default function newStory() {

  const { setTitle } = useTitle();

  const [localImage, setLocalImage] = useState<string>('');
  const [page, setPage] = useState<Page>({ bgImageDboxPath: "", textBoxContent: "" });
  const [story, setStory] = useState<Story>({ id: '', name: '', pages: [] });

  const [uploading, setUploading] = useState<boolean>(false);
  const [namingPhase, setNamingPhase] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const userId = 'tester';

  // Handle back button behavior to prevent accidental closing of unsaved story.
  // Android only
  useEffect(() => {
    const backAction = () => {
      if (page.textBoxContent || localImage || story.pages.length > 0) {
        Alert.alert(
          "Discard changes?",
          "You have unsaved material in your story. Are you sure you want to leave without saving/completing the story?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                router.back();
              }
            }
          ]
        );
        return true;  // Return true to prevent the default back navigation behavior
      } else {
        return false; // Let the default back navigation proceed
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener when the component is unmounted
    return () => backHandler.remove();
  }, [page, localImage]);


  // Save photo to dropbox
  // This would be better to do only when the story is actually saved but no time to change now.
  // There is an issue with adding a page if the user tries to do it too fast and upload isn't finished.
  const handleSavePhoto = async (localImageUri: string, userGivenName: string) => {

    setLocalImage(localImageUri);
    const dropboxPath = `/OurStoryImageStorage/${userId}/${userGivenName}.jpg`

    let retryCount = 0;
    const maxRetries = 3;

    const uploadAttempt = async () => {
      try {
        setUploading(true);
        await uploadImageToDropbox(localImageUri, dropboxPath);
        await setPage(prevPage => ({ ...prevPage, bgImageDboxPath: dropboxPath }));
        setShowCamera(false);
        setUploading(false);
      }
      catch (error) {
        if (retryCount < maxRetries) {
          retryCount++;
          Alert.alert(
            'Error uploading image to dropbox',
            'There was an issue uploading the image to dropbox, would you like to try again?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  setLocalImage('')
                  setShowCamera(false);
                }
              },
              {
                text: 'Retry',
                onPress: () => uploadAttempt(),
              }
            ]
          )
        }
        else {
          Alert.alert('Upload failed', 'Max retries reached.');
          setLocalImage('');
          setShowCamera(false);
        }
      }
    }
    uploadAttempt();
  };

  const addPage = () => {
    console.log("Adding page.");
    console.log("PageTboxContent: ", page.textBoxContent);
    console.log("PageBgImgDPath: ", page.bgImageDboxPath);

    if (!page.textBoxContent || !page.bgImageDboxPath) {
      Alert.alert(
        "Incomplete Page",
        "Please add both text and a background image before trying to add a new page.",
        [{ text: "OK" }]
      );
      return;
    }
    Alert.alert(
      "Add page",
      "Do you want to add this page to the story?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            setStory(prevStory => ({
              ...prevStory,
              pages: [...prevStory.pages, page]
            }));
            setPage({ bgImageDboxPath: "", textBoxContent: "" })
            setLocalImage('');
            console.log("Added page. Debug info: ", localImage, page.bgImageDboxPath, page.textBoxContent)
          }
        }
      ],
      { cancelable: true }
    )
  };

  const endStoryChecks = async () => {
    if (!story.pages || story.pages.length === 0) {
      Alert.alert(
        "Incomplete Story",
        "There are no pages in your story. Please add at least one page.",
        [{ text: "OK" }]
      );
      return;
    }
    if (page.textBoxContent || page.bgImageDboxPath) {
      Alert.alert(
        "Add current page",
        "There is text or a picture in your current page. Do you want to add it to your story?",
        [
          {
            text: "No"
          },
          {
            text: "Yes",
            onPress: async () => {
              if (page.textBoxContent && page.bgImageDboxPath) {
                setStory(prevStory => ({
                  ...prevStory,
                  pages: [...prevStory.pages, page]
                }));
                setPage({ bgImageDboxPath: "", textBoxContent: "" })
                setLocalImage('');
                console.log("Added page. Debug info: ", localImage, page.bgImageDboxPath, page.textBoxContent)

                setNamingPhase(true);
              }
              if (!page.textBoxContent || !page.bgImageDboxPath) {
                Alert.alert(
                  "Incomplete Page",
                  "Please add both text and a background image before trying to add a new page.",
                  [{ text: "OK" }]
                );
                return;
              }
            }
          }
        ]
      )
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
            onPress: () => setNamingPhase(true)
          }
        ],
        { cancelable: true }
      );
      return;
    }
  }

  const endStory = () => {
    firebase.saveStory(story);
    setStory({ id: "", name: "", pages: [] });
    setLocalImage("");
    setPage({ bgImageDboxPath: "", textBoxContent: "" });
    console.log("Story saved to firebase.")
    router.back();
  }

  useEffect(() => {
    if (localImage) {
      console.log("Image updated:", localImage); // Debug to confirm the image URI is set
    }
  }, [localImage]);


  // Set custom title
  useEffect(() => {
    setTitle('New Story');
  }, [setTitle]);

  // For debugging, remove when not needed
  /*     
      useEffect(() => {
          console.log(page);
      }, [page]);
   */
  return (
    <View style={styles.containerBasicCentered}>
      {
        localImage ? (
          <ImageBackground
            source={{ uri: localImage }}
            style={styles.backgroundWithImage}
          />
        ) :
          <ImageBackground
            style={styles.backgroundLightGreen}
          />
      }
      {/*
                (preview feature?)
                Move to previous screen/menu or give option to view story now?           
      */}

      {
        <TouchableOpacity
          style={styles.containerNewStoryButtonsRow}
          onPress={endStoryChecks}>
          <Text style={styles.textNewStoryButtons}>
            Finish Story
          </Text>
          <Icon
            style={styles.iconMargin}
            name="checkcircle" />
        </TouchableOpacity>
      }

      {/*
                Button for adding a background image/taking a picture.
                Maybe create a separate component for modal asking to select gallery or use camera.
                Or utilize an alert. Anyhow functionality in another component.
            */}
      <TouchableOpacity
        style={styles.containerNewStoryButtonsRow}
        onPress={() => setShowCamera(true)}>
        {!localImage ? (
          <>
            <Text style={styles.textNewStoryButtons}>
              Add background image
            </Text>
            <Icon
              style={styles.iconMargin}
              name="pluscircle" />
          </>
        ) :
          <>
            <Text style={styles.textNewStoryButtons}>
              Change background image
            </Text>
            <Icon
              style={styles.iconMargin}
              name="reload1" />
          </>
        }

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
        style={styles.containerNewStoryButtonsRow}
        onPress={addPage}>
        <Text style={styles.textNewStoryButtons}>
          Next page
        </Text>
        <Icon
          style={styles.iconMargin}
          name="arrowright" />
      </TouchableOpacity>

      {/*
                TextInput for adding text to the Page.
                Wrap in a view to limit width.
            */}
      <TextInput
        style={styles.textInput}
        value={page.textBoxContent}
        editable
        multiline={true}
        numberOfLines={5}
        maxLength={50}
        onChangeText={text => setPage({ ...page, textBoxContent: text })}
        placeholder="Write your story here"
      />
      {/* Show guiding plus icon if there is no content. Reposition icon or something though. */}
      {
        !page.textBoxContent ? (
          <Icon name="pluscircle" />
        ) : null
      }
      {/* For user guidance. Style it. */}
      <Text style={styles.textFadedGuiding}>{50 - page.textBoxContent.length} characters remaining</Text>

      <Modal
        style={styles.modalFullScreen}
        animationType="slide"
        transparent={false}
        visible={namingPhase}
        onRequestClose={() => setNamingPhase(!namingPhase)}>
        <View style={styles.containerBasicCentered}>
          <Text style={styles.textContainerHeader}>
            Name your story
          </Text>
          <TextInput
            style={styles.textIndexMenuItems}
            maxLength={20}
            value={story.name}
            onChangeText={text => setStory({ ...story, name: text })}
            placeholder="Give your story a name here">
          </TextInput>
          <Text style={styles.textFadedGuiding}>{20 - story.name.length} characters remaining</Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Story name",
                "You have named your story '" + story.name + "' . Is this okay?",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setNamingPhase(!namingPhase);
                      endStory();
                    }
                  }
                ],
                { cancelable: true }
              )}>
            <Text style={styles.textContainerHeader}>
              Save story
            </Text>
          </TouchableOpacity>
        </View>
      </Modal >
    </View >
  )
}