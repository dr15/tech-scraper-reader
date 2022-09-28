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

export interface AppState {
  feeds: PostItem[][];
  addFeed: (feed: PostItem[]) => void;
}

const useStore = create<AppState>()(
  devtools(
    immer((set) => ({
      feeds: [],
      addFeed: (feed: PostItem[]) =>
        set((state) => {
          state.feeds.push(feed);
        }),
    }))
  )
);

export default useStore;

// import produce from 'immer'

// const useLushStore = create((set) => ({
//   lush: { forest: { contains: { a: 'bear' } } },
//   clearForest: () =>
//     set(
//       produce((state) => {
//         state.lush.forest.contains = null
//       })
//     ),
// }))

// const clearForest = useLushStore((state) => state.clearForest)
// clearForest()
