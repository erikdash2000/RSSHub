const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'https://www.v2rayssr.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.post-3-li.post-list-item');
    
    ctx.state.data = {
        title: 'v2rayssr',
        link: 'https://www.v2rayssr.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('h2 a').text(),
                        description: `
                            ${item.find('.post-excerpt').text()}<br>
                            ${item.find('.post-list-meta-date').text()}<br>
                            <img src="${item.find('.picture img').first().attr('data-wpfc-original-src')}"><br>
                            `,
                        link: item.find('h2 a').attr('href'),
                    };
                })
                .get(),
    };
};

