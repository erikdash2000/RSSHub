const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://bulianglin.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.single-post.panel')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('h2 a').text(),
                link: item.find('h2 a').attr('href'),
                description: `
                    ${item.find('div > p').text()}<br>
                    ${item.find('li:nth-child(2)').text()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'bulianglin',
        link: 'https://bulianglin.com',
        item: item,
    };
};
