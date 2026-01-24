const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const tid = ctx.params.tid;
    const url = `https://github.com/trending?since=${tid}`;

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('article')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('h2 a').text(),
                link: item.find('h2 a').attr('href'),
                description: `
                    ${item.find('p').html()}<br>
                    <br>
                    ${item.find('div.f6.color-fg-muted.mt-2').html()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: `GitHub_${tid}`,
        link: `https://github.com/trending?since=${tid}`,
        item: item,
    };
};
