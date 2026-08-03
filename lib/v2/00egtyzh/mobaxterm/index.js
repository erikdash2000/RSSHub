const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://mobaxterm.mobatek.net/download-home-edition.html';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('.page')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.page-heading h3').first().text()} ${item.find('.version_titre').first().text()}`,
                description: `${item.find('section.page-block.space-top.double-padding-bottom > div.container > div:nth-child(1)').html()}`,
            };
        });
    
    ctx.state.data = {
        title: 'MobaXterm',
        link: 'https://mobaxterm.mobatek.net/download-home-edition.html',
        item: item,
    };
};
