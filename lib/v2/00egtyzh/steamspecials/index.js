const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://store.steampowered.com/search/?specials=1';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('#search_resultsRows')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('a .title').text()} [ ${item.find('a .discount_pct').text()} ] [ ${item.find('a .discount_final_price').text()} ]`,
                link: item.find('a').attr('href'),
                description: `
                    ${item.find('.search_result_row.ds_collapse_flag').href()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Steam_Specials',
        link: 'https://store.steampowered.com/search/?specials=1',
        item: item,
    };
};
