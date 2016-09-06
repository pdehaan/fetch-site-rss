# fetch-site-rss

Fetch a site's RSS feed.

## Why?

... because you only know a site's homepage (ie: http://nytimes.com), but you want to fetch that site's RSS feed. Basically just a cheap wrapper around [**cheerio**](http://npm.im/cheerio) and [**simple-rss**](http://npm.im/simple-rss).

## Installation:

```sh
$ npm i fetch-site-rss -S
```

## Usage:

```js
const { getSiteRss } = require('fetch-site-rss');

getSiteRss('http://latimes.com')
  .then((feed) => {
    console.log(`Found ${feed.items.length} items:`);
    feed.items.forEach((item) => {
      console.log(`${item.title}\n${item.permalink || item.link || item['rss:link']['#']}\n`);
    })
  })
  .catch((err) => console.error(err.message));
```
