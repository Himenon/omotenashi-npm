import puppeteer from 'puppeteer';

/**
 * ウェブサイトのURLから、該当サイトの「タイトル」を取得する
 * @param url 有効なURL
 */
async function getTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  await browser.close();
  return title;
}

exports.getTitle = getTitle;
