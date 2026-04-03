# ehaco_design プロジェクト

## 概要
ehaco! イベントプラットフォームのフロントエンドUIデザインモック（React + Vite + Tailwind CSS）
- バックエンドは別リポジトリ: `/Users/yamadori/getit-seminar`（ベトナムの会社に委託）
- **`getit-seminar` には勝手にpushしない。インフラ（AWS等）も触らない**

## 技術スタック
- React 19 + Vite
- Tailwind CSS + @tailwindcss/typography
- React Router v7
- react-markdown + remark-gfm

## 重要ルール

### Git操作
- **pushは「pushして」と明示的に言われるまで絶対にしない**
- commitも指示があるまでしない
- force-push, reset --hard 等の破壊的操作は禁止

### コーディング規約
- 日本語でコミュニケーション
- TSX（TypeScript）、新規・変換ファイルは .tsx で作成
- Tailwind CSSでスタイリング
- ダミーデータは `src/data/dummy.js` に集約
- 不要なコメントやdocstringを追加しない
- 頼まれていない改善・リファクタをしない

### ファイル構成
```
src/
├── App.jsx          # ルーティング
├── index.css        # グローバルCSS
├── components/      # 共通コンポーネント
├── pages/           # ページコンポーネント
│   ├── mypage/      # マイページ系
│   └── org/         # 主催者管理画面系
├── data/            # ダミーデータ
└── assets/          # 画像等
```
