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
  * **ほぼ** `package.json`に書いてある
--

* 難しい？
  * ~~凝ったことをしなければ~~ 簡単
--

* 開発で使うにはどんなメリットがあるの？
  * 責務分離 → 1つのことに、集中できるようになる


---

# まずは作りましょう

## お題

* WEBサイトのURLから、タイトル情報を取得してくるコマンドラインツール

---

# 拡張する

## お題

* WEBサイトのURLから、タイトル情報を取得してくるコマンドラインツール
--

* 他のライブラリから使えるようにする

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
