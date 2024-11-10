import { CustomHeader } from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="newStory" options={{
        header: () => <CustomHeader title="New Story" />
      }} />
      <Stack.Screen name="storyList" options={{
        header: () => <CustomHeader title="Our stories" />
      }} />
    </Stack>
  );
}
