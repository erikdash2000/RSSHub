const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const mid = ctx.params.mid;
    
    let link;
    if (mid === 'switch') {
        link = 'https://bbs.a9vg.com/forum-661-1.html';
    } else if (mid === 'xboxone') {
        link = 'https://bbs.a9vg.com/forum-609-1.html';
    }
    
    const response = await got({
        method: 'get',
        url: `${link}`,
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('tbody[id^="normalthread"]');
    
    ctx.state.data = {
        title: `a9vg-${mid}`,
        link: `${link}`,
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
