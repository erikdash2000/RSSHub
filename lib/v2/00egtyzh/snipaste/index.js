const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.snipaste.com/download.html#changelog';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('#changelog')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('h4:first-of-type').text()}`,
                description: `
                    ${item.find('ul:first-of-type').html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'Snipaste',
        link: 'https://www.snipaste.com/download.html#changelog',
        item: item,
    };
};
