const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://wp.gxnas.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.article-panel')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.title').text()} [ ${item.find('.mr-2').text()} ]`,
                link: item.find('.a-thumb a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'GXNAS博客',
        link: 'https://wp.gxnas.com',
        item: item,
    };
};
