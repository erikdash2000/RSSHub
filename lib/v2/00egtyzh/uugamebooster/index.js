const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://istore.linkease.com/repo/x86_64/nas/';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('body')
        .toArray()
        .map((item) => {
            item = $(item);

            const a = item.find('a[href^="uug"]').first();

            return {
                title: a.length
                    ? a.text() + ' [ ' + (a[0]?.nextSibling?.data || '').trim() + ' ]'
                    : '',
            };
        });

    ctx.state.data = {
        title: 'uugamebooster',
        link: 'https://istore.linkease.com/repo/x86_64/nas/',
        item: items,
    };
};
