# get-title-ts

## このライブラリのインストール方法

※ npmには未公開のため、ローカルにcloneしてきてインストールを行う。

```
yarn i . -g
```

```sh
yarn install -g [このプロジェクト]
```

## 使い方

```ts
// TypeScript
import { getTitle } from "get-title";

(async() => {
  const title = await getTitle("https://stackoverflow.com/");
  console.log(`Title = ${title}`);  
})();
```

# このライブラリの開発方法

```
yarn install
yarn start
```

## Packaging

publishされる圧縮ファイルの生成

```sh
yarn pack
```

## License

MIT
