import { Meteor } from 'meteor/meteor';
import { News } from './index';
import axios from 'axios';
import cheerio from 'cheerio';
import { Newspapers } from '../newspapers';
import { getDateNow } from '../common/moment';

Meteor.methods({
  async 'news.importNews'() {
    try {
      const date = getDateNow();

      const newspapers = Newspapers.find({ active: true }).fetch();

      for (const newspaper of newspapers) {
        let position = 0;
        const {
          _id: newspaperId,
          title: newspaperTitle,
          logoURL: newspaperLogo,
          url,
          articleSelector,
          titleSelector,
          linkSelector,
          sectionSelector,
          imageSelector
        } = newspaper;

        const response = await axios(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = eval(articleSelector)($);

        articles.each(function() {
          position++;
          const title = eval(titleSelector)($, this);
          const link = eval(linkSelector)($, this);
          const section = eval(sectionSelector)($, this);
          const image = eval(imageSelector)($, this);

          if (title && link) {
            const _section = section ? section : 'General';
            Meteor.call(
              'sections.insert',
              _section,
              newspaperId,
              newspaperTitle
            );

            const total = News.find({ title, link }).count();
            if (total === 0) {
              News.insert({
                title,
                link,
                section: _section,
                image,
                position,
                newspaperId,
                newspaperTitle,
                newspaperLogo,
                date,
                createdAt: new Date()
              });
            }
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  },

  'news.removeAll'() {
    try {
      News.remove({});
    } catch (err) {
      console.error(err);
    }
  }
});
