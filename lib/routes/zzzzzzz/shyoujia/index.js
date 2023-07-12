const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {

    const url = 'https://www.xiaoxiongyouhao.com/fprice/cityprice.php?city=%E4%B8%8A%E6%B5%B7%E5%B8%82';

    const { data: response } = await got(`${url}`);
    const $ = cheerio.load(response);
    
    const item = $('body > div.container')
        .toArray()
        .map((item) => {
            item = $(item);
            return {
                title: `${item.find('h3[class="text-center"]').text()} ${item.find('h5[class="text-center"]').first().text()} ${item.find('.text-right.subtitle').text()}`,
                description: `${item.find('.col-xs-12').first().html()}`,
            };
        });
    
    ctx.state.data = {
        title: '上海油价',
        link: 'https://www.xiaoxiongyouhao.com/fprice/cityprice.php?city=%E4%B8%8A%E6%B5%B7%E5%B8%82',
        item: item,
    };
};
