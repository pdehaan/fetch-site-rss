const { getSiteRss } = require('./index');

getSiteRss('http://latimes.com')
  .then((feed) => {
    console.log(`Found ${feed.items.length} items:`);
    feed.items.forEach((item) => {
      console.log(`${item.title}\n${item.permalink || item.link || item['rss:link']['#']}\n`);
    })
  })
  .catch((err) => console.error(err.message));
