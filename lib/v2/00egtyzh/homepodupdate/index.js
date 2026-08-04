const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://support.apple.com/en-us/108045';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('#sections')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.gb-header').text()}`,
            };
        });
    
    ctx.state.data = {
        title: 'HomePod_Update',
        link: 'https://support.apple.com/en-us/108045',
        item: item,
    };
};
