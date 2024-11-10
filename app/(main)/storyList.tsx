import { fetchStories } from '@/components/firebase/firebaseActions';
import { Story } from '@/types/story';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


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


  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text>This is a placeholder text to identify the page when flist is empty</Text>}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View>
            <TouchableOpacity>
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
