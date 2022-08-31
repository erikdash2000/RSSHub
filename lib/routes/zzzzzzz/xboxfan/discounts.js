const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const tid = ctx.params.tid;
    
    let link;
    if (tid === 'game') {
        link = 'http://www.xboxfan.com/topic?id=11';
    } else if (tid === 'dlc') {
        link = 'http://www.xboxfan.com/topic?id=12';
    }
    
    const response = await got({
        method: 'get',
        url: `${link}`,
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.g_item');
    
    ctx.state.data = {
        title: `xboxfan-discounts-${tid}`,
        link: `${link}`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.text(),
                        description: `
                        ${item.find('.g_item_time').text()}<br>
                        <img src="${item.find('.g_item_img').attr('style').replace('background-image: url(','').replace(')','')}"><br>
                        `,
                        link: item.attr('href'),
                    };
                })
                .get(),
    };
};

