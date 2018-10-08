title: <small>おもてなしnpmライブラリをつくろう</small>
class: animation-fade
layout: true

<!-- This slide will serve as the base layout for all your slides -->
.bottom-bar[
  {{title}}
]

---

class: impact

# {{title}}
## @Himenon

---

# 自己紹介

* 大学院まで物理専攻
* 社会人2年目
* 銀座にいるフロントエンドエンジニア
* サポーターズでは何度か話している

## 好きなもの

* カメラ / バイク（乗りたい）
* ライブラリを探す（最近はnpm系）

---

# 今日話すこと

1. 開発環境について
2. npmライブラリとは
3. まずは作ってみましょう
4. 「おもてなし」とは
5. 実際の開発現場レベルにする

---

# 開発環境について

.col-6[
### Editor

- [Visual Studio Code](https://code.visualstudio.com/)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
  - [設定例(Gistのリンク)](https://gist.github.com/Himenon/51f9cdfd94bc84bf9c7b827ae7d8f748)
]

.col-6[
### Library
- Node = 9.8.0
- npm = 6.4.1
]

.col-12[
- Visual Studio Codeは初期設定でも補完が優秀なのでオススメです
- Nodeとnpmが入っていればどのOSでも構いません
]

---

# npmライブラリとは

## JavaScript製のパッケージマネージャー

```bash
# 例えば
npm install -g web2pdf
```

**参考**
- https://www.npmjs.com/
- https://www.npmjs.com/package/web2pdf

---

# npmのQ&A

--

* よくわからない
  * **ほぼ** `package.json`に書いてあるので１つずつ読んでいく
--

* 難しい？
  * ~~凝ったことをしなければ~~ 簡単
--

* 開発で使うにはどんなメリットがあるの？
  * 責務分離 → 1つのことに、集中できるようになる

---

# まずは作りましょう

## お題

* URLを入力するとサイトタイトルを取得するCLI

```bash
npm init
```

---

# ディレクトリ構成

```txt
get-site-title
├── bin
│   └── cli.js
└── package.json
```

---


# package.json

CLI化するポイント

```json
"bin": {
  "get-title": "./bin/cli.js"
}
```

`npm install`したときに、`get-title`として使える

---

# シンプルに作る

```js
# bin/cli.js
function main(url) {
  console.log(url);
}
main(process.argv[2]);
```

試してみる

```sh
$ node ./bin/cli.js https://github.com
https://github.com
```

`process.argv=["node", "./bin/cli.js", "https://github.com"]`

---

# テストを追加する

[jest](https://github.com/facebook/jest)を使う

```sh
npm i -D jest
npx jest init
# 勝手に初期化してくれうr
```

* [ちゃんと使い分けてる? dependenciesいろいろ。 \- Qiita](https://qiita.com/cognitom/items/acc3ffcbca4c56cf2b95)

---

# 実はこのままだとテストしづらい

```js
function main(url) {
  console.log(url);
}

main(process.argv[2]); // ここが走ってしまう
```

`main`関数の分離をしておく

---

# ファイル分割

```js
// ./main.js
function getSiteTitle(url) {
  console.log(url);
}

exports.getSiteTitle = getSiteTitle;
```

```js
// ./bin/cli.js
const main = require('../main');

main.getSiteTitle(process.argv[2]);
```

---

# 整理

```txt
get-site-title
├── bin
│   └── cli.js       # CLIのエントリーポイント
├── main.js          # メインロジック
└── package.json
```

---

# テストを書く

```txt
get-site-title
├── bin
│   └── cli.js       # CLIのエントリーポイント
├── main.js          # メインロジック
├── __tests__
│   └── main.test.js # メインロジックのテスト
└── package.json
```

`jest`のデフォルト設定で今回は行います。

---

# テストの動作確認

```js
// __tests__/main.test.js
describe('メインロジックのテスト', () => {
  test('動作確認', () => {
    expect(1).toEqual(1);
  });
});
```

```json
// package.json
"scripts": {
  "test": "jest"
},
```

---

# テストの動作確認

```sh
npm run test
```

![テストの動作確認](./images/main-test.png)

動作確認が終わってから、ロジックのテストを書くようにすると、気が楽です。

---

# テストできるコードにする

`getSiteTitle`の返り値を指定する

```diff
// main.js
function getSiteTitle(url) {
-  console.log(url);
+  return "The world’s leading software development platform · GitHub"";
}

exports.getSiteTitle = getSiteTitle;
```

---

# テストする

<small>
```js
const main = require('../main');

describe('getSiteTitleのテスト', () => {
  test('https://github.com/', () => {
    const title = main.getSiteTitle('https://github.com/');
    expect(title).toEqual('The world’s leading software development platform · GitHub');
  });
});
```
</small>

.col-6[
  `npm run test`で確認する
]
.col-6[
  ![Githubのタイトル取得のテスト](./images/test-1.png)
]

---

# テストを追加する

<small>
```js
test('http://example.com/', () => {
  const title = main.getSiteTitle('http://example.com/');
  expect(title).toEqual("Example Domain");
});
```
</small>

.col-6[
* 今のままだと落ちます
* 原因：ただ値を返しているから
* → テストは、「なぜ」を発見する
]
.col-6[
  <small>![example.comのテスト](./images/test-2.png)</small>
]

---

# <small>テストが通過するように実際のロジックを書こう</small>

Headless Chromeの[puppeteer](https://github.com/GoogleChrome/puppeteer)を使う

```sh
npm i puppeteer
```

* <https://github.com/GoogleChrome/puppeteer>
* <https://pptr.dev/>

---

# タイトルを取るロジックを書く

<small>
```js
const puppeteer = require('puppeteer');

async function getSiteTitle(url) {
  const browser = await puppeteer.launch(); // puppeteerの起動
  const page = await browser.newPage();     // ブラウザタブの用意
  await page.goto(url);                     // 指定したURLを開く
  const title = await page.title();         // ページタイトルの取得
  await browser.close();                    // ブラウザを閉じる
  return title;                             // タイトルを返す
}

exports.getSiteTitle = getSiteTitle;
```
</small>

* Githubの[Usage](https://github.com/GoogleChrome/puppeteer#usage)をほぼコピペ

---

# テストを実行する

.col-6[
```sh
  npm run test
```
* 一発で通過します。
]
.col-6[
  <img src="./images/test-3.png" alt="puppeteer導入後のテスト" style="height: 250px;">
]

---

# CLIの修正をする

<small>
```diff
const main = require('../main');

- main.getSiteTitle(process.argv[2]);
+ (async() => {
+   const title = await main.getSiteTitle(process.argv[2]);
+   console.log(title);
+ })();
```
</small>

動作確認

```
$ node ./bin/cli.js https://github.com
The world’s leading software development platform · GitHub
```

---

# <small>作ったライブラリで「おもてなし」をしよう</small>

<div style="height: 1em"></div>

.col-6[
## <small>ユーザーに対して</small>
* **インストール方法**
* **使い方**
* サンプルコードを用意する
]
.col-6[
## <small>開発者に対して</small>

* 開発環境の構築方法
* テストの方法を書く
* **package.jsonを詳しく書く**
]

* ドキュメントやpackage.jsonが充実していることが極めて重要
* 一度作ってしまえば、使い回しが効くので最初だけ頑張ればよい

---

# ユーザーに対するおもてなし

**最高なUX**

```bash
npm install [package]
```

---

# <small>開発者に対するおもてなし - 開発環境の構築方法</small>

**最高なUX**

```bash
git clone [repository]
npm install
npm start
```

`prepare`, `preinstall`

---

# <small>開発者に対するおもてなし - テストの方法</small>

**最高なUX**

```bash
npm run test
```

---

# <small>開発者に対するおもてなし - package.json</small>

---

# 実際の開発現場レベルにする

※ ここからレベルが上がります

- CI/CD
- 文法チェック
- フォーマッタ
- コミットフォーマッタ
- TypeScript
- マルチパッケージ管理

---

# まとめ

* 最小限のコマンドで開発できるようにする
* 暗黙的より明示的であるほうが良い
* 便利なツールを使う
* 自動化を行う
