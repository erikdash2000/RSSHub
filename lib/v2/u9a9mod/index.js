const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const sid = ctx.params.sid;
    const url = `https://u9a9.com/?type=2&search=${sid}`;

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.default')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('td:nth-child(5)').text(),
                link: item.find('td:nth-child(2) > a').attr('href'),
                description: `
                    ${item.find('td:nth-child(2) > a').text()}<br>
                    ${item.find('td:nth-child(4)').text()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: `u9a9mod_${sid}`,
        link: `https://u9a9.com/?type=2&search=${sid}`,
        item: item,
    };
};
