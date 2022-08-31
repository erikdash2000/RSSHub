const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {

    const response = await got({
        method: 'get',
        url: 'https://bbs.hupu.com/kog-hot',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.bbs-sl-web-post-body');

    ctx.state.data = {
        title: 'hupukog',
        link: 'https://bbs.hupu.com/kog-hot',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: `${item.find('a[class="p-title"]').text()} [${item.find('.post-time').text()}]`,
                        link: item.find('a[class="p-title"]').attr('href'),
                    };
                })
                .get(),
    };
};
