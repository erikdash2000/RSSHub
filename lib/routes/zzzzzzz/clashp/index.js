const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://github.com/Dreamacro/clash/releases/tag/premium';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.Box-body')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('div.d-flex.flex-md-row.flex-column > div.d-flex.flex-row.flex-1.mb-3.wb-break-word > div.flex-1 > h1').text()}`,
                description: `<ul>${item.find('div.markdown-body.my-3 ul').first().html()}</ul>`,
            };
        });
    
    ctx.state.data = {
        title: 'Release_clash_Premium',
        link: 'https://github.com/Dreamacro/clash/releases/tag/premium',
        item: item,
    };
};
