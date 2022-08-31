const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'https://tachyondevel.medium.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.v.gb');
    
    ctx.state.data = {
        title: 'tachyon',
        link: 'https://tachyondevel.medium.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.dr.bv').text(),
                        description: `
                            ${item.find('span .az.b.ba.bb.bx').text()}<br>
                            ${item.find('.dl.gg.gh.dg.gi').text()}<br>
                            `,
                        link: item.find('.dr.bv').attr('href'),
                    };
                })
                .get(),
    };
};

