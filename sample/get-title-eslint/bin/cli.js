#!/usr/bin/env node
const main = require('../main');

(async() => {
  const title = await main.getTitle(process.argv[2]);
  process.stdout.write(title);
})();
