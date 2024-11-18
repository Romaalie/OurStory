import { CustomHeader } from "@/components/CustomHeader";
import { CustomHeaderNoBack } from "@/components/CustomHeaderNoBack";
import { Stack } from "expo-router";
import { TitleProvider } from "@/components/TitleContext";

export default function HomeLayout() {
  return (
    <TitleProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="newStory" options={{
          header: () => <CustomHeaderNoBack title="New Story" />
        }} />
        <Stack.Screen name="storyList" options={{
          header: () => <CustomHeader title="Our stories" />
        }} />
        <Stack.Screen name="ourStory" options={{
          header: () => <CustomHeaderNoBack title="View Story" />
        }} />
      </Stack>
    </TitleProvider>
  );
}
