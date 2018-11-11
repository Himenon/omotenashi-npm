import * as puppeteer from 'puppeteer';

import { myname } from './hoge';

myname();

export function hogeName() {
  console.log('hoge');
}

/**
 * ウェブサイトのURLから、該当サイトの「タイトル」を取得する
 * @param url 有効なURL
 */
export async function getTitle(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  await browser.close();
  return title;
}
