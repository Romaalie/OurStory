// To fix the typescript issues of typescript not being able to determine the type of the props
import { Story } from '@/types/story';

export type RootStackParamList = {
  storyList: undefined;
  ourStory: { story: Story };
};
