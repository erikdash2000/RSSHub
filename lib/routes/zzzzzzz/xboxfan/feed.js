const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'http://www.xboxfan.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $(`.homeItem[v-if="showFeedLevel == 'feed'"]`);

    ctx.state.data = {
        title: `xboxfan-feed`,
        link: 'http://www.xboxfan.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.homeName').text(),
                        description: `
                        ${item.find('.homeTime').text()}<br>
                        ${item.find('.homeAList').html()}<br>
                        <img src="${item.find('.home2_head').attr('style').replace('background-image: url(','').replace(');','')}"><br>
                        `,
                        link: item.find('.homeMore').attr('href'),
                    };
                })
                .get(),
    };
};

