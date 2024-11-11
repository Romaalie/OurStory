import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-get-random-values';
import { decode, encode } from 'base-64';
import { Buffer } from 'buffer';
import stream from 'stream-browserify';

// Set up the crypto polyfill
if (typeof global.btoa === 'undefined') {
  global.btoa = encode;
}

if (typeof global.atob === 'undefined') {
  global.atob = decode;
}

if (typeof global.crypto === 'undefined') {
  global.crypto = require('react-native-crypto');
}

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

// Polyfill for the stream module
if (typeof global.Readable === 'undefined') {
  global.Readable = stream.Readable;
}
if (typeof global.Writable === 'undefined') {
  global.Writable = stream.Writable;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
