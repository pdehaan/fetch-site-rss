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

getSiteRss('http://www.latimes.com')
  .then((feed) => {
    console.log(`Found ${feed.items.length} items:`);
    feed.items.forEach((item) => {
      console.log(`${item.title}\n${item.permalink || item.link || item['rss:link']['#']}\n`);
    })
  })
  .catch((err) => console.error(err.message));
```

Or, if you want to proxy all the RSS feed URLs through the Metadata service, you can use the [**proxy-services**](https://github.com/pdehaan/proxy-services) module, like so:

```js
const { getSiteRss } = require('fetch-site-rss');
const { getMetadata } = require('proxy-services');

const MAX_ITEMS = 20;

getSiteRss('http://www.latimes.com')
  .then((feed) => {
    const items = feed.items.map((item) => {
      return (item.permalink || item.link || item['rss:link']['#']);
    });
    // Inject the original URL into the array.
    items.unshift(feed.url);
    return items;
  })
  // Make sure we only ever scrape at most 20 items (otherwise metadata proxy will reject request).
  .then((items) => items.slice(0, MAX_ITEMS))
  .then((items) => getMetadata(items))
  .then((items) => JSON.stringify(items, null, 2))
  .then((output) => console.log(output))
  .catch((err) => console.error(err.message));
```
