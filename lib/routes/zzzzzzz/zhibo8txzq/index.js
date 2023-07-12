const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://bbs.zhibo8.cc/forum/list/?fid=8';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('tbody:nth-child(3) > tr')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('a:nth-child(2)').text(),
                link: item.find('a:nth-child(2)').attr('href'),
                description: `
                    ${item.find('cite > a').text()}<br>
                    ${item.find('td:nth-child(2) > em').text()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: '足球直播吧',
        link: 'https://bbs.zhibo8.cc/forum/list/?fid=8',
        item: item,
    };
};
