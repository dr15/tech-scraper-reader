import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export interface PostItem {
  title: string;
  date?: string;
  link: string;
  content?: string;
  author?: string;
  guid?: string;
}
export interface Feed {
  title: string;
  link: string;
  description?: string;
  posts: PostItem[];
}

export interface AppState {
  feeds: PostItem[][];
  addFeed: (feed: PostItem[]) => void;
  currentReaderPath?: string;
  setCurrentPath?: (path: string) => void;
}

const useStore = create<AppState>()(
  devtools(
    immer((set) => ({
      feeds: [],
      currentReaderPath: '/dashboard',
      addFeed: (feed: PostItem[]) =>
        set((state) => {
          state.feeds.push(feed);
        }),
      setCurrentPath: (path: string) =>
        set((state) => {
          state.currentReaderPath = path;
        }),
    }))
  )
);

export default useStore;
