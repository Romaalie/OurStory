import { Link } from "expo-router";
import { BackHandler, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const backgroundImage = require('@/assets/images/background-main-2.jpg')

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Text>OUR STORY header text, adjust</Text>

        <View>
          <Link href="/newStory">New Story</Link>
          <Link href="/storyList">Our Stories</Link>
          <TouchableOpacity onPress={handleExitApp} style={{ marginTop: 20 }}>
            <Text style={{ color: "red" }}>Close App</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
