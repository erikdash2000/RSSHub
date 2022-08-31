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
                        title: item.find('.info.clear').text(),
                        description: `
                            <img src="${item.find('img[class="lj-lazy"]').attr('data-original')}"><br>
                            ${item.find('.info.clear').text()}<br>
                            `,
                        link: item.find('.title a').attr('href'),
                    };
                })
                .get(),
    };
};
