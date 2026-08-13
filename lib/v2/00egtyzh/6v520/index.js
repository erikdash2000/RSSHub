const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const iconv = require('iconv-lite');

module.exports = async (ctx) => {

    const url = 'https://www.6v520.com/gvod/zx.html';

    const { data: response } = await got(`${url}`, {
        responseType: 'buffer',
    });
    const $ = cheerio.load(iconv.decode(response, 'gbk'));

    const items = $('.list li')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.text()}`,
                link: item.find('a').attr('href'),
            };
        });

    ctx.state.data = {
        title: '电影6v',
        link: 'https://www.6v520.com/gvod/zx.html',
        item: items,
    };
};
