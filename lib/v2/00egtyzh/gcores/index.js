const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.gcores.com/news';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.col.mb-5')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('h3').text()}`,
                link: item.find('a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: '资讯 | 机核',
        link: 'https://www.gcores.com/news',
        item: item,
    };
};
