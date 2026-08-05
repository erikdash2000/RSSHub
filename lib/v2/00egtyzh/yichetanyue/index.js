const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://baa.yiche.com/tanrong/';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.col-row.bankuai')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.title-content').text()} [ ${item.find('.tz-item.tz-last-rep .tz-item-txt.item-bot').text()} ]`,
                link: item.attr('href'),
            };
        });

    ctx.state.data = {
        title: 'yichetanyue',
        link: 'https://baa.yiche.com/tanrong/',
        item: item,
    };
};
