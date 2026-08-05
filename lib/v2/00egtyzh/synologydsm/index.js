const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://archive.synology.com/download/Os/DSM';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);

    const item = $('th[scope="row"] a')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.text()}`,
                link: item.attr('href'),
            };
        });

    ctx.state.data = {
        title: 'Synology_DSM',
        link: 'https://archive.synology.com/download/Os/DSM',
        item: item,
    };
};
