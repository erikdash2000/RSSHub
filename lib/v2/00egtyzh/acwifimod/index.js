const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.acwifi.net';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.excerpt.excerpt-one')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `[${item.find('header > a').text()}] ${item.find('header > h2 > a').text()}`,
                link: item.find('header > h2 > a').attr('href'),
                description: `
                    ${item.find('p.note').text()}<br>
                    ${item.find('p.text-muted.time').text()}<br>
                    <img src="${item.find('p.focus > a > img').attr('data-original')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: '路由器技术分享',
        link: 'https://www.acwifi.net',
        item: item,
    };
};
