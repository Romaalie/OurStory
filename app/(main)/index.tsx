import { Link } from "expo-router";
import { BackHandler, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/styles";

export default function HomeScreen() {

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const backgroundImage = require('@/assets/images/background-main-2.jpg')

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
    >

      <SafeAreaView
        style={styles.containerSafeArea}
      >

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
      </SafeAreaView>
    </ImageBackground>
  );
};