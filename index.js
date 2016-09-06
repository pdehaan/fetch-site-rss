const cheerio = require('cheerio');
const fetch = require('node-fetch');
const rss = require('simple-rss');

exports.getSiteRss = getSiteRss;

function getSiteRss(url) {
  return fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const rssFeeds = $('link[type="application/rss+xml"]').toArray();
      if (rssFeeds.length) {
        return rssFeeds[0].attribs.href;
      }
      throw new Error(`Unable to find RSS feed for ${url}`);
    })
    .then((rssHref) => rss(rssHref))
    .then((items) => ({url, items}));
}
