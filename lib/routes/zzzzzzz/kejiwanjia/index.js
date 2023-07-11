const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.kejiwanjia.com/jingxuanpost';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.post-list-item.item-post-style-1')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `[${item.find('.post-list-cat-item.b2-radius').text()}] ${item.find('h2 a').text()}`,
                link: item.find('h2 a').attr('href'),
                description: `
                    ${item.find('.post-excerpt').text()}<br>
                    ${item.find('.list-footer').html()}<br>
                    <img src="${item.find('.post-module-thumb > a > picture > img').attr('data-src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: '科技玩家',
        link: 'https://www.kejiwanjia.com/jingxuanpost',
        item: item,
    };
};
