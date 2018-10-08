const puppeteer = require('puppeteer');

async function getSiteTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  await browser.close();
  return title;
}

exports.getSiteTitle = getSiteTitle;
