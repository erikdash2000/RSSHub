const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'http://portableappz.blogspot.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.main.section .entry');
    
    ctx.state.data = {
        title: 'portableappz',
        link: 'http://portableappz.blogspot.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.entrytitle a').text(),
                        description: `
                            ${item.find('.entrybody').html()}<br>
                            `,
                    };
                })
                .get(),
    };
};
