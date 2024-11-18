import { app } from "@/firebaseConfig";
import { getDatabase, ref, push, onValue } from "firebase/database";

import { Story } from "@/types/story";

const database = getDatabase(app);

export const saveStory = (story: Story) => {
    if (story.pages && story.name) {
        push(ref(database, 'stories/'), story);
    }
    else {
        throw new Error('Story must have a name and at least one page');
    }
};

// Sometimes this returns all the ids as "". No idea why.
export const fetchStories = (): Promise<Story[]> => {
    return new Promise((resolve, reject) => {
        const storiesRef = ref(database, 'stories/');
        onValue(storiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const stories: Story[] = Object.entries(data).map(([id, storyData]) => ({
                    ...storyData as Omit<Story, 'id'>,
                    id,

                }));
                resolve(stories);
            } else {
                resolve([]);
            }
        },
            (error) => reject(error));
    })
};