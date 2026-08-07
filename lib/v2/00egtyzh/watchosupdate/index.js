const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://support.apple.com/en-us/123002';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.gb-header')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.text()}`,
            };
        });

    ctx.state.data = {
        title: 'watchOS_Update',
        link: 'https://support.apple.com/en-us/123002',
        item: item,
    };
};
