import { Link, Stack } from 'expo-router';
import { View} from 'react-native';
import { styles } from '@/styles/styles';

// Currently points to (main). Might have to edit if (auth) is implemented.
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={styles.containerBasicCentered}>
        <Link href="/(main)">Go to home screen</Link>
      </View>
    </>
  );
};