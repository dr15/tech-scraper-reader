import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RSS = require('rss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sanitize = require('sanitize-filename');

export interface PostItems {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
}

export interface Channel {
  title: string;
  description: string;
  author: string;
  site_url: string;
  items: PostItems[];
}

export function createNewRSSFeed(channel: Channel) {
  const { title, description, author, site_url, items } = channel;

  const feed = new RSS({
    title,
    description,
    author,
    site_url,
  });

  for (const item of items) {
    const { title, description, url, publishedDate } = item;
    feed.item({
      title,
      description,
      url,
      publishedDate,
    });
  }

  const xml = feed.xml({ indent: true });
  fs.writeFileSync(`${sanitize(title)}.xml`, xml);
}
