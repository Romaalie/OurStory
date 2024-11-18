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


export default function newStory() {

  const [localImage, setLocalImage] = useState<string>('');
  const [page, setPage] = useState<Page>({ bgImageDboxPath: "", textBoxContent: "" });
  const [story, setStory] = useState<Story>({ id: '', name: '', pages: [] });

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
  const handleSavePhoto = async (localImageUri: string, userGivenName: string) => {

    setLocalImage(localImageUri);
    const dropboxPath = `/OurStoryImageStorage/${userId}/${userGivenName}.jpg`

    let retryCount = 0;
    const maxRetries = 3;

    const uploadAttempt = async () => {
      try {
        await uploadImageToDropbox(localImageUri, dropboxPath);
        setPage(prevPage => ({ ...prevPage, bgImageDboxPath: dropboxPath }));
        setShowCamera(false);
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
          }
        }
      ],
      { cancelable: true }
    )
  };

  // 
  const endStoryChecks = () => {
    if (!story.pages || story.pages.length === 0) {
      Alert.alert(
        "Incomplete Story",
        "There are no pages in your story. Please add at least one page.",
        [{ text: "OK" }]
      );
      return;
    }
    // Add check if there is data in current page to add it to the story
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
            onPress: () => { setNamingPhase(true) }
          }
        ],
        { cancelable: true }
      );
      return;
    }
    setNamingPhase(true);
    console.log("This should be in the logs if shortstory ok'ed.")
  }

  const endStory = () => {
    firebase.saveStory(story);
    console.log("Story saved to firebase.")
  }

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={namingPhase}
        onRequestClose={() => setNamingPhase(!namingPhase)}>
        <Text>
          Name your story
        </Text>
        <TextInput
          value={story.name}
          onChangeText={text => setStory({ ...story, name: text })}
          placeholder="Give your story a name here">
        </TextInput>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Confirm your story name",
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
          <Text>
            Save story
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}