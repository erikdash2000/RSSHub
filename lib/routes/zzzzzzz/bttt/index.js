const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.bt-tt.com/html/15-0.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.col-sm-4.col-md-3.col-lg-2')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('font').text(),
                link: item.find('a').attr('href'),
                description: `
                    ${item.find('div span').text()}<br>
                    <img src="${item.find('img').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'BT天堂',
        link: 'https://www.bt-tt.com/html/15-0.html',
        item: item,
    };
};
