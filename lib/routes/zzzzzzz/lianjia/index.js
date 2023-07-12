const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const aid = ctx.params.aid;

    let link;
    link = `https://sh.lianjia.com/ershoufang/rs${aid}`;

    const response = await got({
        method: 'get',
        url: `${link}`,
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.clear.LOGVIEWDATA.LOGCLICKDATA');

    ctx.state.data = {
        title: `LianJia-${aid}`,
        link: `${link}`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.title a').text(),
                        link: item.find('.title a').attr('href'),
                        description: `
                            ${item.find('.info.clear').html()}<br>
                            <img src="${item.find('img[class="lj-lazy"]').attr('data-original')}"><br>
                            `,
                    };
                })
                .get(),
    };
};
