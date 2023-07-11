const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.kejiwanjia.com/jingxuanpost';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.post-list-item')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `[${item.find('.post-list-cat-item').text()}] ${item.find('div.post-info > h2 > a').text()`,
                link: item.find('div.post-info > h2 > a').attr('href'),
                description: `
                    ${item.find('div.post-excerpt').text()}<br>
                    ${item.find('div.list-footer').html()}<br>
                    <img src="${item.find('div.post-module-thumb > a > picture > img').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: '科技玩家',
        link: 'https://www.kejiwanjia.com/jingxuanpost',
        item: item,
    };
};
