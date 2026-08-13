const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.btbtla.com/type/movies/?o=0';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('.module-item')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.module-item-titlebox a').text()}`,
                link: item.find('.module-item-titlebox a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'BT影视',
        link: 'https://www.btbtla.com/type/movies/?o=0',
        item: items,
    };
};
