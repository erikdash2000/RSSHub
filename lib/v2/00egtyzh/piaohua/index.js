const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.piaohua.com/html/dianying.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('.col-sm-4.col-md-3.col-lg-2')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.text()}`,
                link: item.find('a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: '电影飘花网',
        link: 'https://www.piaohua.com/html/dianying.html',
        item: items,
    };
};
