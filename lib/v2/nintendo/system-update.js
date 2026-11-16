const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.nintendo.co.jp/support/switch/system_update/index.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('h3')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.text()}`,
            };
        });

    ctx.state.data = {
        title: 'Nintendo Switch 本体更新情報',
        link: 'https://www.nintendo.co.jp/support/switch/system_update/index.html',
        item: items,
    };
};
