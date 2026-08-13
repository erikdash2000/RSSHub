const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://mymuwu.net';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('.post-item')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.post-title').text()}`,
                link: item.find('.post-title a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'mymuwu',
        link: 'https://mymuwu.net',
        item: items,
    };
};
