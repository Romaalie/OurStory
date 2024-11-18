import { fetchStories } from '@/components/firebase/firebaseActions';
import { Story } from '@/types/story';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { styles } from '@/styles/styles';


export default function StoryListScreen() {

  const [stories, setStories] = useState<Story[]>([]);


  useEffect(() => {
    const getStories = async () => {
      try {
        const stories = await fetchStories();
        const ids = stories.map(story => story.id);
        const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

        if (duplicateIds.length > 0) {
          console.warn('Duplicate IDs found:', duplicateIds);
        }
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
    <View style={styles.containerBasicCentered}>
      <ImageBackground
        style={styles.backgroundLightGreen}
      />
      <FlatList
        ListHeaderComponent={
          stories.length === 0 ? (
            <Text>You don't have any stories saved currently</Text>
          ) : <Text style={styles.textContainerHeader}>Select the story you want to view:</Text>
        }
        keyExtractor={item => item.id || item.name || String(Math.random())}
        renderItem={({ item }) =>
          <View>
            <TouchableOpacity
              onPress={() => handleStoryPress(item)}
            >
              <Text style={styles.textFlatListStories}>{item.name}</Text>
            </TouchableOpacity>
          </View>

        }
        data={stories}
      />
    </View>
  );
}
