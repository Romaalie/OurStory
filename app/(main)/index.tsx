import { Link } from "expo-router";
import { BackHandler, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/styles";
import { DboxGetToken } from "@/components/dropbox/DboxGetToken";
import { useState } from "react";

export default function HomeScreen() {

  const [dboxTokenRetrieved, setDboxTokenRetrieved] = useState<boolean>(false);

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const handleTokenRetrieval = (isSuccess: boolean) => {
    if (isSuccess) {
      console.log("Dbox token retrieved successfully.")
      setDboxTokenRetrieved(true);
    }
    else {
      console.log("Problem retrieving dbox token.")
    }
  }

  const backgroundImage = require('@/assets/images/background-main-2.jpg')

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
    >
      <SafeAreaView
        style={styles.containerSafeArea}
      >
        <Modal
          style={styles.modalFullScreen}
          animationType="slide"
          transparent={false}
          visible={!dboxTokenRetrieved}
          onRequestClose={() => setDboxTokenRetrieved(true)}>
          {/* <DboxAuthExpoExample /> */}
          <DboxGetToken onAuthComplete={handleTokenRetrieval} />
        </Modal>
        <View>


          <Text
            style={styles.textIndexHeader}
          >OUR STORY</Text>

          <View
            style={styles.containerMenuItems}>
            <Link
              style={styles.textIndexMenuItems}
              href="/newStory">New Story</Link>
            <Link
              style={styles.textIndexMenuItems}
              href="/storyList">Our Stories</Link>
            <TouchableOpacity onPress={handleExitApp} style={{ marginTop: 20 }}>
              <Text style={styles.textIndexMenuItems}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};