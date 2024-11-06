import { View, Text, StyleSheet } from 'react-native';

export default function StoryListScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the screen for the listing of a user's stories</Text>
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
