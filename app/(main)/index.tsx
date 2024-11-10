import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the home screen</Text>

      <Link href="/newStory">New Story</Link>
      <Link href="/storyList">Our Stories</Link>
      <Text>Close app button placeholder</Text>
    </SafeAreaView>
  );
}
