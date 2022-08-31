const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'http://www.eshop-switch.com/game.html',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.col-md-12.game-grid .col-md-2');
    
    ctx.state.data = {
        title: 'eshop-switch',
        link: 'http://www.eshop-switch.com/game.html',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.media-name').text(),
                        description: `
                            ${item.find('.media-price').text()}<br>
                            <img src="${item.find('img').attr('src')}"><br>
                            `,
                        link: item.find('.game-a').attr('href'),
                    };
                })
                .get(),
    };
};

