const puppeteer = require('puppeteer');

module.exports = async (ctx) => {
  // 启动浏览器
  const browser = await puppeteer.launch();

  try {
    // 打开一个新页面
    const page = await browser.newPage();
    // 进入目标网站
    await page.goto('https://club.autohome.com.cn/bbs/forum-c-4744-1.html');

    // 等待新闻加载完成（你需要根据目标网站的具体情况调整等待时间）
    await page.waitForSelector('.post-list');

    // 执行JavaScript代码来获取新闻标题和链接
    const news = await page.evaluate(() => {
      // 在这里编写JavaScript代码，获取新闻标题和链接
      const newsElements = document.querySelectorAll('.post-list .post-title');
      const newsList = [];
      newsElements.forEach((element) => {
        const title = element.querySelector('a').innerText;
        const link = element.querySelector('a').href;
        newsList.push({
          title: title,
          link: link,
        });
      });
      return newsList;
    });

    // 将获取到的新闻数据返回给rsshub
    ctx.state.data = {
      title: 'autohome-tayron',
      link: 'https://club.autohome.com.cn/bbs/forum-c-4744-1.html',
      item: news,
    };
  } catch (err) {
    console.error('获取失败：', err);
    ctx.state.data = {
      title: '获取失败',
      description: '获取失败，稍后重试。',
    };
  } finally {
    // 关闭浏览器
    await browser.close();
  }
};
