const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const tid = ctx.params.tid;
    const cid = ctx.params.cid;

    let link;
    if (tid === 'discounts') {
        link = `https://xbdeals.net/${cid}-store/discounts?type=games`;
    } else if (tid === 'freewithgold') {
        link = `https://xbdeals.net/${cid}-store/collection/free_with_gold`;
    } else if (tid === 'mostwanted') {
        link = `https://xbdeals.net/${cid}-store/collection/most_wanted`;
    }

    const response = await got({
        method: 'get',
        url: `${link}`,
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.game-collection-item-link');

    ctx.state.data = {
        title: `xbdeals-${tid}-${cid}`,
        link: `${link}`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: `${item.find('.game-collection-item-details-title').text()} [${item.find('.game-collection-item-save').text()}]`,
                        description: `
                            ${item.find('.game-collection-item-top-platform').text()}<br>
                            ${item.find('.game-collection-item-save').text()}<br>
                            ${item.find('span[class="game-collection-item-regular-price "]').text()}<br>
                            <del>${item.find('span.game-collection-item-regular-price.strikethrough').text()}</del><br>
                            ${item.find('.game-collection-item-bonus-price').text()}<br>
                            ${item.find('.game-collection-item-discount-price').text()}<br>
                            ${item.find('span[itemprop="priceValidUntil"]').text()}<br>
                            ${item.find('.game-collection-item-end-date').text()}<br>
                            <img src="${item.find('.game-collection-item-image-placeholder picture img').attr('content')}"><br>
                            `,
                        link: item.attr('href'),
                    };
                })
                .get(),
    };
};
