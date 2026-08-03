const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://support.apple.com/zh-cn/service-programs';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('section.as-container-column.as-columns--2up-extended.as-banner--top')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('div:nth-child(2) > div > div > div > p > a').text(),
                link: item.find('div:nth-child(2) > div > div > div > p > a').attr('href'),
                description: `
                    ${item.find('div:nth-child(2) > div > div > div > p > span').text()}<br>
                    <img src="${item.find('div:nth-child(1) > div > div > div > p > img').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Apple_服务计划',
        link: 'https://support.apple.com/zh-cn/service-programs',
        item: item,
    };
};
