const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.dekudeals.com/hottest';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.col-xl-2.col-lg-3.col-sm-4.col-6.cell')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.h6.name').text()} [${item.find('.align-text-bottom.badge.badge-danger').text()}] [${item.find('strong').text()]}`,
                link: item.find('.main-link').attr('href'),
                description: `
                    <del>${item.find('.text-muted').text()}</del><br>
                    <strong>${item.find('.align-text-bottom.badge.badge-warning').text()}</strong><br>
                    ${item.find('div > div:nth-child(3) small').text()}<br>
                    <img src="${item.find('.responsive-img.shadow-img.tiny').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'dekudeals_Hottest',
        link: 'https://www.dekudeals.com/hottest',
        item: item,
    };
};
