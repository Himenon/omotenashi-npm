const main = require('get-title-babel');

(async () => {
  const title = await main.getTitle('https://docs.npmjs.com/misc/scripts');
  process.stdout.write(title);
})();
  