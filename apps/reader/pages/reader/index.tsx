import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import {
  IconGauge,
  IconList,
  IconBookmark,
  IconMessage,
  IconRss,
} from '@tabler/icons';
import Parser from 'rss-parser';

import PostList from '../../components/PostList';
import useStore, { PostItem } from '../../utils/store/store';
import ReaderLayout from '../../components/ReaderLayout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFeeds = [
  '/api/rss/cult.honeypot.io/rss.xml',
  '/api/rss/css-tricks.com/feed/',
  '/api/rss/dev.to/feed',
  '/api/rss/javascript.plainenglish.io/feed',
  '/api/rss/javascriptweekly.com/rss/',
  '/api/rss/js.libhunt.com/newsletter/feed',
  '/api/rss/nodeweekly.com/rss/',
  '/api/rss/frontendfoc.us/rss/',
];

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  { label: 'All Items', icon: IconList },
  { label: 'Bookmarked', icon: IconBookmark },
  { label: 'Comments', icon: IconMessage },
  {
    label: 'Feeds',
    icon: IconRss,
    initiallyOpened: true,
    links: [
      {
        label: 'Cult by Honeypot',
        link: '/',
        rssUrl: 'cult.honeypot.io/rss.xml',
      },
      // { label: 'CSS Tricks', link: '/', rssUrl: 'css-tricks.com/feed/' },
      { label: 'Dev.to', link: '/', rssUrl: 'dev.to/feed' },
    ],
  },
];

async function fetchFeed(url: string): Promise<PostItem[]> {
  const d = await fetch(`/api/rss/${url}`)
    .then((response) => response.text())
    .then((str) => {
      // const text = new window.DOMParser().parseFromString(str, 'text/xml');

      const parser: Parser = new Parser();
      return parser.parseString(str).then((feed) => {
        const data = feed.items.map((item) => {
          return {
            title: item.title,
            link: item.link,
            date: item.pubDate,
            content: item.content,
            author: item.creator,
            //guid
          };
        });

        return data;
      });
    });

  return d;
}

function Reader() {
  const feeds = useStore<PostItem[][]>((state) => state.feeds);
  const addFeed = useStore((state) => state.addFeed);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const data = await fetchFeed(mockdata[4].links[1].rssUrl);
      addFeed(data);

      setLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <Loader size="lg" /> : <PostList items={feeds[0]} />}</>;
}

Reader.Layout = ReaderLayout;

export default Reader;
