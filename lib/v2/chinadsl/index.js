const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'http://www.chinadsl.net/forum-41-1.html',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('tbody[id^="normalthread"]');
    
    ctx.state.data = {
        title: 'chinadsl',
        link: 'http://www.chinadsl.net/forum-41-1.html',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('a[class="s xst"]').text(),
                        description: `
                            ${item.find('.by').last('em').text()}<br>
                            `,
                        link: item.find('a[class="s xst"]').attr('href'),
                    };
                })
                .get(),
    };
};
