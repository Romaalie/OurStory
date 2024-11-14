import { fetchStories } from '@/components/firebase/firebaseActions';
import { Story } from '@/types/story';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


export default function StoryListScreen() {

  const [stories, setStories] = useState<Story[]>([]);


  useEffect(() => {
    const getStories = async () => {
      try {
        const stories = await fetchStories();
        setStories(stories);
      }
      catch (error) {
        console.error("Error fetching stories: ", error)
      }
    };

    getStories();
  }, []);

  const handleStoryPress = (story: Story) => {
    const storyString = JSON.stringify(story);
    router.push({
      pathname: '/(main)/ourStory',
      params: { story: storyString },
    })
  };


  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          stories.length === 0 ? (
            <Text>You don't have any stories saved currently</Text>
          ) : null
        }
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View>
            <TouchableOpacity
              onPress={() => handleStoryPress(item)}
            >
              <Text>Click here to view your story: {item.name}</Text>
            </TouchableOpacity>
          </View>

        }
        data={stories}
      />
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
