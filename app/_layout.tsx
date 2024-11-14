import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'ShadowsIntoLight-Regular': require('../assets/fonts/ShadowsIntoLight-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
  );
}
