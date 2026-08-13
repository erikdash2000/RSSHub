const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const iconv = require('iconv-lite');

module.exports = async (ctx) => {

    const url = 'https://www.dytt8899.com/html/gndy/dyzz/index.html';

    const { data: response } = await got(`${url}`, {
        responseType: 'buffer',
    });
    const $ = cheerio.load(iconv.decode(response, 'gbk'));

    const items = $('.tbspan')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('a').text()} [ ${item.find('tr:nth-of-type(3)').text()} ]`,
                link: item.find('a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: '电影天堂',
        link: 'https://www.dytt8899.com/html/gndy/dyzz/index.html',
        item: items,
    };
};
