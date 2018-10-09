import { getTitle } from "get-title";

(async() => {
  const title = await getTitle("https://stackoverflow.com/");
  console.log(`Title = ${title}`);  
})();
