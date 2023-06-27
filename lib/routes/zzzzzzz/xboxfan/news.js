const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {

    const url = 'http://www.xboxfan.com';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $(`.homeItem[v-if="showFeedLevel == 'read'"]`)
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.homeName').text()}[${item.find('.homeTime').text()}]`,
                description: `
                    ${item.find('.homeTxt').text()}<br>
                    ${item.find('.homeCom.ell').html()}<br>
                    <img src="${item.find('.homeZ_img').attr('src')}"><br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: `xboxfan-news`,
        link: 'http://www.xboxfan.com/',
        item: item,
    };
};
