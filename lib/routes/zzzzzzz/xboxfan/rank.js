const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    
    const response = await got({
        method: 'get',
        url: 'http://www.xboxfan.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.RankItem');
    
    ctx.state.data = {
        title: `xboxfan-rank`,
        link: 'http://www.xboxfan.com/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: `${item.find('.RankName.ell').text()} [${item.find('.RankHot').text()}`,
                        description: `
                        ${item.find('.RankHot').text()}<br>
                        <img src="${item.find('.Rank_img').attr('style').replace('background-image: url(','').replace(');','')}"><br>
                        `,
                        link: item.attr('href'),
                    };
                })
                .get(),
    };
};

