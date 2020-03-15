const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.lavoz.com.ar/';

axios(url)
  .then(response => {
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

      if (title) console.log(title, link, section);
    });
  })
  .catch(console.error);
