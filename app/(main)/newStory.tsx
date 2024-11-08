import StoryTemplate from '@/components/StoryTemplate';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewStoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StoryTemplate />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
