import { Link } from "expo-router";
import { BackHandler, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        style={styles.safeArea}
      >

        <Text
          style={styles.headerText}
        >OUR STORY</Text>

        <View
          style={styles.containerMenuItems}>
          <Link
            style={styles.menuText}
            href="/newStory">New Story</Link>
          <Link
            style={styles.menuText}
            href="/storyList">Our Stories</Link>
          <TouchableOpacity onPress={handleExitApp} style={{ marginTop: 20 }}>
            <Text style={styles.menuText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: 'ShadowsIntoLight-Regular',
    fontSize: 60,
  },
  menuText: {
    fontSize: 30
  },
  containerMenuItems: {
    flex: 1,
    marginTop: 30
  }
});