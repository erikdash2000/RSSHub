const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.mpyit.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.box_entry')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('.box_entry_title a').text(),
                link: item.find('.box_entry_title a').attr('href'),
                description: `
                    <img src="${item.find('.thumbnail_t img').attr('src')}"><br>
                    ${item.find('.info .date').text()}<br>
                    ${item.find('.post_entry').text()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: '殁漂遥',
        link: 'https://www.mpyit.com',
        item: item,
    };
};
