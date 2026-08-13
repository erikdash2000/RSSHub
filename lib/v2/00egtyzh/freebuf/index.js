const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.freebuf.com/feed';

    const { data: response } = await got(`${url}`);

    const $ = cheerio.load(response, { xmlMode: true });

    const items = $('item')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('title').text()}`,
                link: item.find('link').text(),
                description: `
                    ${item.find('description').text()}<br>
                    ${item.find('content:encoded').text()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'FreeBuf',
        link: 'https://www.freebuf.com/feed',
        item: items,
    };
};
