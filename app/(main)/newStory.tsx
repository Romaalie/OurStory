import StoryTemplate from '@/components/StoryTemplate';
import { StyleSheet, View } from 'react-native';


export default function NewStoryScreen() {
  return (
    <View style={styles.container}>
      <StoryTemplate />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
