#!/usr/bin/env node
import { getTitle } from "./main";

(async () => {
  const title = await getTitle(process.argv[2]);
  process.stdout.write(title);
})();
