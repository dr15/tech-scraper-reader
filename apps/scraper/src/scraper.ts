import { Channel, createNewRSSFeed, PostItems } from './rss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Nightmare = require('nightmare');

interface IntermediaryChannel {
  title: string;
  description: string;
  url: string;
  author: string;
  publishedDate: string;
  lastMessage: string;
}

// TODO: turn scraper into a class that get intialized with these values
console.log(
  '\n\n=== Scraper loading ... ========================================'
);
const urlList = ['https://t.me/s/webWekkly', 'https://t.me/s/techpicks'];
console.log(`Scraper will scrape`, urlList);

function breakMessageIntoSingleItems(str) {
  const items = str.split('<br>').filter((item) => item !== '');
  items.shift();

  const clean = items.map((item) => {
    return item.replace(/<\/?[^>]+(>|$)/g, '');
  });

  return clean;
}

function getPostItems(messageString: string, dateString: string): PostItems[] {
  const PostItems: PostItems[] = [];
  const arr = breakMessageIntoSingleItems(messageString);

  arr.forEach((item, index) => {
    if (!item.startsWith('http') && arr[index + 1]?.startsWith('http')) {
      const url = arr[index + 1];
      PostItems.push({
        title: item,
        description: `<a href="${url}">${url}</a>`,
        url,
        publishedDate: dateString,
      });
    }
  });

  return PostItems;
}

function getChannelData(): IntermediaryChannel {
  // Genral channel data
  const channelTitle = document.querySelector(
    '.tgme_channel_info_header_title'
  ).textContent;
  const channelAuthor = document.querySelector(
    '.tgme_channel_info_header_username'
  ).textContent;
  const channelDescription = document.querySelector(
    '.tgme_channel_info_description'
  ).textContent;

  // Last message date
  const allDates = document.querySelectorAll('time');
  const lastMessageDate =
    allDates[allDates.length - 1].getAttribute('datetime');

  // Last message content
  const messages = document.querySelectorAll('.tgme_widget_message_text');
  const messageList = Array.from(messages);
  const lastMessage = messageList[messageList.length - 1].innerHTML;

  const channel: IntermediaryChannel = {
    title: channelTitle,
    author: channelAuthor,
    description: channelDescription,
    url: 'string',
    publishedDate: lastMessageDate,
    lastMessage,
  };

  return channel;
}

function createChannelObject(data: IntermediaryChannel, url): Channel {
  const { title, author, description, lastMessage, publishedDate } = data;

  const channel: Channel = {
    title,
    author,
    description,
    site_url: url,
    items: getPostItems(lastMessage, publishedDate),
  };

  return channel;
}

async function scrapeLatestMessage(url) {
  try {
    const nightmare = new Nightmare();
    const channelData = await nightmare
      .goto(url)
      .wait('.tgme_widget_message_text')
      .evaluate(getChannelData)
      .end();

    console.log('*** Succeeded to get data from url', url);
    return createChannelObject(channelData, url);
  } catch (e) {
    console.log('*** Failed to get data from url', url);
    throw e;
  }
}

export async function getAllLatestMessages() {
  for (const url of urlList) {
    const channel = await scrapeLatestMessage(url);
    createNewRSSFeed(channel);
  }

  console.log(
    '=== Finished scraping all urls ================================='
  );
}
