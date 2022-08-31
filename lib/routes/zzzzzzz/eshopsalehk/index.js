const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {

    const response = await got({
        method: 'get',
        url: 'https://store.nintendo.com.hk/games/sale',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.category-product-item');

    ctx.state.data = {
        title: 'eshop-sale-hk',
        link: 'https://store.nintendo.com.hk/games/sale',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: `${item.find('.category-product-item-title-link').text()}[${item.find('.price-box.price-final_price').text()}]`,
                        description: `
                            ${item.find('.category-product-item-released').text()}<br>
                            ${item.find('.price-box.price-final_price').text()}<br>
                            <img src="${item.find('img').attr('data-src')}"><br>
                            `,
                        link: item.find('.category-product-item-title-link').attr('href'),
                    };
                })
                .get(),
    };
};
