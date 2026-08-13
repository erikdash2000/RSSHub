const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const logger = require('@/utils/logger');

module.exports = async (ctx) => {

    const url = 'https://www.runningcheese.com';

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

    const items = $('.post_main.simple')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('h2 a').text()} [ ${item.find('.date').text()} ]`,
                link: item.find('h2 a').attr('href'),
                description: `
                    ${item.html()}<br>
                    `,
            };
        });

    browser.close();

    ctx.state.data = {
        title: '奔跑中的奶酪',
        link: 'https://www.runningcheese.com',
        item: items,
    };
};
