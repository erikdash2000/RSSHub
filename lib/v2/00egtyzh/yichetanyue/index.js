const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const logger = require('@/utils/logger');

module.exports = async (ctx) => {

    const url = 'https://baa.yiche.com/tanrong/';

    const browser = await require('@/utils/puppeteer')();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        request.resourceType() === 'document' ? request.continue() : request.abort();
    });
    const link = `${url}`;
    logger.http(`Requesting ${link}`);
    await page.goto(link, {
        waitUntil: 'domcontentloaded',
    });
    const response = await page.content();
    page.close();

    const $ = cheerio.load(response);

    const items = $('.col-row.bankuai')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('.title-content').text()} [ ${item.find('.tz-item.tz-last-rep .tz-item-txt.item-bot').text()} ]`,
                link: item.attr('href'),
            };
        });

    browser.close();

    ctx.state.data = {
        title: 'yichetanyue',
        link: 'https://baa.yiche.com/tanrong/',
        item: items,
    };
};
