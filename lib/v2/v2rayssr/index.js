const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.v2rayssr.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.post-3-li.post-list-item')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('h2 a').text(),
                link: item.find('h2 a').attr('href'),
                description: `
                    ${item.find('.post-excerpt').text()}<br>
                    ${item.find('.post-list-meta-date').text()}<br>
                    <img src="${item.find('.picture img').attr('data-src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'v2rayssr',
        link: 'https://www.v2rayssr.com/',
        item: item,
    };
};
