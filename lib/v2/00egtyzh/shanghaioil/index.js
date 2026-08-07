const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const iconv = require('iconv-lite');

module.exports = async (ctx) => {

    const url = 'http://www.huangjinjiage.cn/oil/shanghai.html';

    const { data: response } = await got(`${url}`, {
        responseType: 'buffer',
    });
    const $ = cheerio.load(iconv.decode(response, 'gbk'));

    const item = $('.m-art-body')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `[ ${item.find('table.bx:first-of-type th:nth-of-type(3)').text()} ${item.find('table.bx:first-of-type td:nth-of-type(3)').text()} ] ${item.find('p:nth-of-type(1)').text()}`,
                description: `
                    ${item.find('p:nth-of-type(2)').text()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: '上海油价',
        link: 'http://www.huangjinjiage.cn/oil/shanghai.html',
        item: item,
    };
};
