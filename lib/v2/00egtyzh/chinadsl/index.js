const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'http://www.chinadsl.net/forum-41-1.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('.kmlist.new')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.kmtit').text()} [ ${item.find('.kmtime').text()} ]`,
                link: item.find('.kmtit').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'chinadsl',
        link: 'http://www.chinadsl.net/forum-41-1.html',
        item: items,
    };
};
