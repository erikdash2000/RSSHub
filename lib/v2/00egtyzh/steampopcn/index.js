const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.yxdzqb.com/index_popular_cn.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('.bg-none > td')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.children('div').eq(0).text()} [ ${item.find('td:nth-of-type(4)').text()} ]`,
                link: item.find('a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'Steam中文热门',
        link: 'https://www.yxdzqb.com/index_popular_cn.html',
        item: item,
    };
};
