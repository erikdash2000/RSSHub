const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://wp.gxnas.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('article')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `[${item.find('div > div.kratos-post-inner-new > header > a').text()}] ${item.find('div > div.kratos-post-inner-new > header > h2 > a').text()}`,
                link: item.find('div > div.kratos-post-inner-new > header > h2 > a').attr('href'),
                description: `
                    ${item.find('div > div.kratos-post-inner-new > div > p').text()}<br>
                    ${item.find('div > div.kratos-post-meta-new > span:nth-child(1) > a:nth-child(1)').text()}<br>
                    <img src="${item.find('div > div.kratos-entry-thumb-new > a > img').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'GXNAS博客',
        link: 'https://wp.gxnas.com',
        item: item,
    };
};
