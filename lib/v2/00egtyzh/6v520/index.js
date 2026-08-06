const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.6v520.com/gvod/zx.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.list li')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('a').text()}`,
                link: item.find('a').attr('href'),
            };
        });

    ctx.state.data = {
        title: '电影6v',
        link: 'https://www.6v520.com/gvod/zx.html',
        item: item,
    };
};
