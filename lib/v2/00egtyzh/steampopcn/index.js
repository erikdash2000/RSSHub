const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.yxdzqb.com/index_popular_cn.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('.game')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.game-title').text()} ( ${item.find('.game-cn').text()} ) [ ${item.find('.game-price').text()} ]`,
                link: item.find('.title-link').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'Steam中文热门',
        link: 'https://www.yxdzqb.com/index_popular_cn.html',
        item: items,
    };
};
