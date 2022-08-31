const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'https://www.runningcheese.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.ajaxpost');
    
    ctx.state.data = {
        title: 'runningcheese',
        link: 'https://www.runningcheese.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('h2 a').text(),
                        description: `
                        ${item.find('.excerpt').text()}<br>
                        ${item.find('.date').text()}<br>
                        <img src="${item.find('img').attr('src')}"><br>
                        `,
                        link: item.find('h2 a').attr('href'),
                    };
                })
                .get(),
    };
};

