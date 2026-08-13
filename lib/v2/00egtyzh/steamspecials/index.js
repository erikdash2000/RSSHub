const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://store.steampowered.com/search/?specials=1';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('#search_resultsRows a')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.title').text()} [ ${item.find('.discount_pct').text()} ] [ ${item.find('.discount_final_price').text()} ]`,
                link: item.attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'Steam_Specials',
        link: 'https://store.steampowered.com/search/?specials=1',
        item: items,
    };
};
