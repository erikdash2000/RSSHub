const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.v2ray-agent.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.recent-post-item')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('div.recent-post-info > div.recent-post-info-top > a').text(),
                link: item.find('div.recent-post-info > div.recent-post-info-top > a').attr('href'),
                description: `
                    ${item.find('div.recent-post-info > div.article-meta-wrap > span.post-meta-date > time').text()}<br>
                    <img src="${item.find('.post_bg.entered.loaded').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'mack-a',
        link: 'https://www.v2ray-agent.com',
        item: item,
    };
};
