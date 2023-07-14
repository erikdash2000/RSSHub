const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://store.steampowered.com/search/?specials=1';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.search_result_row')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.title').text()} [${item.find('.discount_pct').text()}] [${item.find('.discount_final_price').text()}]`,
                link: item.attr('href'),
                description: `
                    <del>${item.find('.discount_original_price').text()}</del><br>
                    ${item.find('.col.search_released.responsive_secondrow').text()}<br>
                    <img src="${item.find('.col.search_capsule img').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Steam_Specials',
        link: 'https://store.steampowered.com/search/?specials=1',
        item: item,
    };
};
