const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {

    const response = await got({
        method: 'get',
        url: 'https://www.pianku.li/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.content-list li');

    ctx.state.data = {
        title: 'pianku-mv',
        link: 'https://www.pianku.li/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('h3 a').text(),
                        description: `
                            ${item.find('h3 span').text()}<br>
                            ${item.find('.bottom').text()}<br>
                            <img src="${item.find('.li-img.cover img').attr('data-src')}"><br>
                            `,
                        link: item.find('h3 a').attr('href'),
                    };
                })
                .get(),
    };
};
