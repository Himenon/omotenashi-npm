# get-title-babel

## このライブラリのインストール方法

※ npmには未公開のため、ローカルにcloneしてきてインストールを行う。

```
npm i . -g
```

```sh
npm install -g [このプロジェクト]
```

## 使い方

```js
import { getTitle } from "get-title";

(async() => {
  const title = await getTitle("https://stackoverflow.com/");
  console.log(`Title = ${title}`);  
})();
```

# このライブラリの開発方法

```
npm install
npm start
```

## Packaging

publishされる圧縮ファイルの生成

```sh
npm pack
```

## License

MIT
