import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="newStory" />
        <Stack.Screen name="storyList" />
      </Stack>
    </SafeAreaProvider>
  );
}
