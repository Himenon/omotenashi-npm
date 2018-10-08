#!/usr/bin/env node
const main = require('../main');

(async() => {
  const title = await main.getSiteTitle(process.argv[2]);
  console.log(title);
})();
