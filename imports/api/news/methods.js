import { Meteor } from 'meteor/meteor';
import { News } from './index';
import axios from 'axios';
import cheerio from 'cheerio';
const url = 'https://www.lavoz.com.ar/';

Meteor.methods({
  async 'news.importFromSources'() {
    try {
      //if (Meteor.isServer) Meteor.reset();
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = $('article');

      articles.each(function() {
        const title = $(this)
          .find('.title')
          .text()
          .trim();

        const link = $(this)
          .find('h1 > a,h2 > a,h3 > a')
          .attr('href');

        const section = $(this)
          .find('small')
          .first()
          .text();

        if (title) {
          News.insert({
            title,
            link,
            section
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
});
