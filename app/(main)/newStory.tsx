import { View, Text, StyleSheet } from 'react-native';

export default function NewStoryScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the screen where a user can create a new story</Text>
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
