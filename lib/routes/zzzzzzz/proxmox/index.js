const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.proxmox.com/en/news';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('#adminForm > table > tbody > tr:nth-child(2) > td > div')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: item.find('a').text(),
                link: item.find('a').attr('onclick'),
                description: `
                    ${item.find('.sentondate').text()}<br>
                    `,
            };
        });
    
    ctx.state.data = {
        title: 'Proxmox',
        link: 'https://www.proxmox.com/en/news',
        item: item,
    };
};
