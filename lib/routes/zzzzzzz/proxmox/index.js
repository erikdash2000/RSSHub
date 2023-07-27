const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.proxmox.com/en/about/in-the-news';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('p[class!="visually-hidden"]')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.text(),
                link: item.find('a').attr('href'),
                description: `
                    ${item.text()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Proxmox',
        link: 'https://www.proxmox.com/en/about/in-the-news',
        item: item,
    };
};
