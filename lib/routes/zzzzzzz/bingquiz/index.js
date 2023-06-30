const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.tellustheanswer.com/category/quizzes/';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.site-main.hfeed article')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('.entry-title a').text(),
                link: item.find('.entry-title a').attr('href'),
                description: `
                    ${item.find('.entry-excerpt p').text()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Bing_Quiz',
        link: 'https://www.tellustheanswer.com/category/quizzes/',
        item: item,
    };
};
