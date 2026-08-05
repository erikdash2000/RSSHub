const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.centbrowser.com/history.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.list')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('p').text()}`,
                description: `${item.html()}`,
            };
        });

    ctx.state.data = {
        title: 'centbrowser',
        link: 'https://www.centbrowser.com/history.html',
        item: item,
    };
};
