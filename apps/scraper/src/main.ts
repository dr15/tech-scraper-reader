import { getAllLatestMessages } from './scraper';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const cron = require('node-cron');

// cron.schedule('* * * * *', function () {
//   console.log('minutely scrape');
//   getAllLastMessages();
// });

getAllLatestMessages();
