// eslint-disable-next-line @typescript-eslint/no-var-requires
const Nightmare = require('nightmare');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cron = require('node-cron');

console.log('\n\n=== Hello World! ========================================');
const urlList = ['https://t.me/s/webWekkly', 'https://t.me/s/techpicks'];
console.log(`this is urlList`, urlList);

function extractMessageBody() {
  const messages = document.querySelectorAll('.tgme_widget_message_text');
  const messageList = Array.from(messages);
  const lastMessage = messageList[messageList.length - 1];
  return lastMessage.innerHTML;
}

function getTitleLinkPairs(arr) {
  const titleLinkPairs = [];

  arr.forEach((item, index) => {
    if (!item.startsWith('http') && arr[index + 1]?.startsWith('http')) {
      titleLinkPairs.push({
        title: item,
        link: arr[index + 1],
      });
    }
  });

  return titleLinkPairs;
}

function getSingleItemPosts(str) {
  const x = str.split('<br>').filter((item) => item !== '');
  x.shift();
  const clean = x.map((element) => {
    return element.replace(/<\/?[^>]+(>|$)/g, '');
  });
  return clean;
}

async function getLastMessage(url) {
  try {
    const nightmare = new Nightmare();
    console.log(`\n\n**** ${url}`);
    const lastMessage = await nightmare
      .goto(url)
      .wait('.tgme_widget_message_text')
      .evaluate(extractMessageBody)
      .end();

    console.log(getTitleLinkPairs(getSingleItemPosts(lastMessage)));
  } catch (e) {
    console.log('Failed to get data from url');
    throw e;
  }
}

async function getAllLastMessages() {
  for (const url of urlList) {
    await getLastMessage(url);
  }
}

cron.schedule('* * * * *', function () {
  console.log('minutely scrape');
  getAllLastMessages();
});
