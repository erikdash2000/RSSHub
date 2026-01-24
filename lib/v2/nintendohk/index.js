const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.nintendo.com.hk/topics';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.ncmn-grid__col')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('.ncmn-softUnit__name').text(),
                link: item.find('a').attr('href'),
                description: `
                    ${item.find('.ncmn-softUnit__release').text()}<br>
                    <img src="${item.find('.ncmn-thumb').attr('style').match('https.*?png')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Nintendo-HK',
        link: 'https://www.nintendo.com.hk/topics',
        item: item,
    };
};
