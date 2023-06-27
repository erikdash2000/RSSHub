const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'http://www.xboxfan.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $(`.homeItem[v-if="showFeedLevel == 'read'"]`);

    ctx.state.data = {
        title: `xboxfan-news`,
        link: 'http://www.xboxfan.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: `${item.find('.homeName').text()}[${item.find('.homeTime').text()}]`,
                        description: `
                        ${item.find('.homeTxt').text()}<br>
                        ${item.find('.homeCom.ell').html()}<br>
                        <img src="${item.find('.homeZ_img').attr('src')}"><br>
                        `,
                    };
                })
                .get(),
    };
};
