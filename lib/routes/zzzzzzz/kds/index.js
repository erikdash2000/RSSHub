const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {

    const response = await got({
        method: 'get',
        url: 'https://club.kdslife.com/f_15.html',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('li[class="i2"]');

    ctx.state.data = {
        title: 'kdslife',
        link: 'https://club.kdslife.com/f_15.html',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.n3').text(),
                        description: `${item.find('span.n5').text()} ${item.find('span.n6').text()}`,
                        link: item.find('.n1 a').attr('href'),
                    };
                })
                .get(),
    };
};
