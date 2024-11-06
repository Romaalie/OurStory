import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the home screen</Text>
      <Link href="/newStory">New Story</Link>
      <Link href="/storyList">My Stories</Link>
      <Text>Close app button placeholder</Text>
    </View>
  );
}
