const main = require('../main');

describe('getSiteTitleのテスト', () => {

  test('https://github.com/', async () => {
    const title = await main.getSiteTitle('https://github.com/');
    expect(title).toEqual("The world’s leading software development platform · GitHub");
  });

  test('http://example.com/', async () => {
    const title = await main.getSiteTitle('http://example.com/');
    expect(title).toEqual("Example Domain");
  });

});
