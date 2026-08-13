const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.asus.com/networking-iot-servers/wifi-routers/asus-gaming-routers/rt-ax86u-pro/helpdesk_bios?model2Name=RT-AX86U-Pro';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const items = $('.overHidden > div > div > div:nth-of-type(1)')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.children('div:nth-of-type(1)').text()}`,
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    ctx.state.data = {
        title: 'RT-AX86U-Pro',
        link: 'https://www.asus.com/networking-iot-servers/wifi-routers/asus-gaming-routers/rt-ax86u-pro/helpdesk_bios?model2Name=RT-AX86U-Pro',
        item: items,
    };
};
