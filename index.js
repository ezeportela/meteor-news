const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.lavoz.com.ar/';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('article');

    const fn = `(cheerio, html) => {
      const $ = cheerio.load(html);
      console.log(html);
      return $('a > amp-img').attr('src');
    }`;

    const article = $(articles).first();

    const title = $(article)
      .find('.title')
      .first()
      .find('a')
      .text()
      .trim();

    const link = $(article)
      .find('h1 > a,h2 > a,h3 > a')
      .attr('href');

    const section = $(article)
      .find('small')
      .first()
      .text()
      .trim();

    const image = $(article)
      .find('.image')
      .html();

    const lal = eval(fn)(cheerio, image);

    if (title) console.log(lal);
  })
  .catch(console.error);
