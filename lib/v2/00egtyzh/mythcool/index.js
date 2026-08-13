const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'http://myth.cool/cn/download.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('body')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.Version.d-flex.align-items-center').text()}`,
                description: `
                    ${item.find('.edition:nth-child(2)').html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'Myth.Cool',
        link: 'http://myth.cool/cn/download.html',
        item: items,
    };
};
