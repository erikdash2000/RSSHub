const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.runningcheese.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.post_main.simple')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('h2 a').text()} [ ${item.find('.date').text()} ]`,
                link: item.find('h2 a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: '奔跑中的奶酪',
        link: 'https://www.runningcheese.com',
        item: item,
    };
};
