# ehaco! 機能・デザイン仕様書

最終更新: 2026-03-31

## 1. プロダクト概要

**ehaco!** はビジネス向けウェビナー・セミナー・イベント情報の検索・申込プラットフォーム。
参加者がイベントを探し申し込む体験と、主催者がイベントを管理する体験を提供する。

### 対象ユーザー
- **参加者**: ビジネスパーソン（イベント検索・申込・管理）
- **主催者**: イベント運営者（イベント作成・申込者管理・アンケート・ターゲット設定）

### 本モックの範囲
- フロントエンドUIのみ（バックエンド未接続）
- 全データはダミーデータで表示
- フォーム送信・認証・決済は未実装（UIのみ）

---

## 2. 技術スタック

| 項目 | 技術 | バージョン |
|------|------|-----------|
| フレームワーク | React | 19 |
| ビルドツール | Vite | 8 |
| スタイリング | Tailwind CSS | v4 |
| ルーティング | React Router (HashRouter) | v7 |
| 言語 | JavaScript (JSX) | - |
| デプロイ | GitHub Pages | - |

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
```

---

## 3. デザインシステム

### 3-1. カラーパレット

| 名前 | HEX | 用途 |
|------|-----|------|
| Primary | `#0f172a` | ヘッダー背景、Orgサイドバー |
| Primary Light | `#1e293b` | サブカラー |
| Accent | `#6366f1` | CTAボタン、リンク、アクティブ状態 |
| Accent Light | `#818cf8` | ホバー状態 |
| Background | `#f8fafc` | ページ全体の背景色 |
| Text | `#0f172a` | 本文テキスト |
| Border | `#e2e8f0` | カード・セクションのボーダー |
| Muted | `#475569` | 補助テキスト（コントラスト改善済み） |
| Gold | `#f59e0b` | 締め切り間近バッジ |
| Section Tint | `#f1f5f9` | セクション背景（薄い青） |
| Section Warm | `#faf5ff` | セクション背景（薄いウォーム） |

### 3-2. タイポグラフィ

- **フォント**: Inter, Noto Sans JP（Hiragino Kaku Gothic ProN, Meiryo フォールバック）
- **H1ページタイトル**: `text-2xl md:text-3xl font-black` 統一
  - マイページ系: 下線バー（`h-1.5 w-16 bg-accent rounded-full`）
  - Org系: 左ボーダー（`border-l-4 border-accent pl-4`）
  - EventDetail: `text-2xl md:text-4xl font-black tracking-tight`
- **H2セクション見出し**: `font-bold tracking-tight`
- **本文**: `text-base`（16px）を基本、補助テキストは`text-sm`

### 3-3. レスポンシブブレークポイント

| ブレークポイント | 幅 | 主な変化 |
|----------------|-----|---------|
| デフォルト | <640px | 1カラム、ハンバーガーメニュー、ボトムナビ |
| sm | 640px | 2カラムグリッド、横並びカード |
| md | 768px | PC用ナビ表示 |
| lg | 1024px | 3カラムグリッド、Orgサイドバー表示 |

### 3-4. 共通パターン

**カードスタイル**: `rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 bg-white`

**空状態**: アイコンを丸い背景(`w-16 h-16 rounded-full bg-accent/10`)内に配置 + タイトル（太字）+ 説明文 + CTAボタン

**ボタンスタイル**:
- Primary CTA: `btn-gradient`（インディゴ→バイオレットのグラデーション、hover時にglow、active:scale-0.97）
- Secondary: `border border-ehaco-border text-ehaco-text rounded-lg hover:border-accent hover:text-accent`
- Danger: `border border-red-300 text-red-500 hover:bg-red-50 rounded-lg`
- Ghost: `text-accent hover:text-accent-light`

**ステータスバッジ**: 全て `border border-*-200` 付き
- 緑（アクティブ）: `bg-green-100 text-green-700 border-green-200`
- 青（公開前）: `bg-blue-100 text-blue-700 border-blue-200`
- 灰（終了/下書き）: `bg-gray-100 text-gray-500 border-gray-200`
- 黄（招待中）: `bg-yellow-100 text-yellow-700 border-yellow-200`

**タブ下線**: `h-0.5 bg-accent rounded-full`（MypageSidebarは`border-b border-accent`）

**ページ遷移**: 全ページに `fade-in` アニメーション（0.4s、8px上昇）

**フォーム入力**: `rounded-lg border border-ehaco-border bg-white focus:ring-2 focus:ring-accent/30 focus:border-accent transition`

**カードhover**: `hover:shadow-xl hover:ring-accent/30 transition-all duration-300 active:scale-[0.99]`

**CSSユーティリティ**:
- `.btn-gradient` — グラデーションCTAボタン
- `.text-gradient` — グラデーションテキスト
- `.fade-in` — フェードインアニメーション
- `.card-hover` — カードホバーエフェクト
- `.glass` / `.glass-dark` — グラスモーフィズム

---

## 4. グローバルコンポーネント

### 4-1. ヘッダー（参加者サイト）

**位置**: sticky top-0、白背景、shadow-sm
**モバイル**: ロゴ `h-7`、ボタン `w-8 h-8`、パディング `py-1.5`

**PC版ナビゲーション**: イベントを探す / ehaco!とは / 掲載希望の方
**通知ベル**: PC=ドロップダウン、モバイル=お知らせページに直接遷移
**ユーザーメニュー**: ダッシュボード / お知らせ / プロフィール / 設定 / 主催者管理 / ログアウト
**モバイルメニュー**: スライドダウン、主催者管理リンク付き

### 4-2. フッター

**モバイル**: アコーディオン式（セクション折りたたみ）
**PC**: 3カラム展開
**コピーライト**: `text-white/40`（コントラスト改善済み）

### 4-3. イベントカード

**Vertical**: 縦型、hover時に `-translate-y-1.5` + shadow + ring色変化
**Horizontal**: モバイルで縦積み（`flex-col sm:flex-row`）、タグはモバイルで非表示（`hidden sm:flex`）
**画像**: `loading="lazy"` 付き

### 4-4. マイページサイドバー

**PC**: 横タブ（`text-base font-medium`、`border-b border-accent`）
**モバイル**: 固定ボトムナビゲーション（4項目: ダッシュボード / お知らせ / プロフィール / 設定）
**safe-area対応**: `pb-[env(safe-area-inset-bottom)]`

---

## 5. 参加者側ページ

### 5-1. トップページ / 検索ページ（`/`、`/search`）
- 検索バー: glass effect（`bg-white/80 backdrop-blur-sm`）
- タイトル: `text-gradient`
- フィルター: ハーフシートドロワー（モバイル）、件数プレビュー付き
- イベント一覧: 無限スクロール（IntersectionObserver、8件ずつ）
- 空状態: 検索アイコン + メッセージ

### 5-2. ホームページ（`/home`）
- ヒーロー: `text-2xl sm:text-4xl md:text-6xl`、グラデーション背景
- おすすめカルーセル + 新着 + 締め切り間近

### 5-3. イベント詳細（`/event/:id`）
- バナー + オーバーラップタイトルカード
- セクション見出し: `tracking-tight` + accent左ボーダー
- モバイルCTA: 残席数 + 締切日 + `btn-gradient`
- 関連イベントリンク修正済み

### 5-4. ログイン（`/login`）
- Header/Footer非表示の独立レイアウト
- ソーシャルログイン（Google/Facebook）→ 区切り線 → メールログイン（展開式）
- パスワード表示/非表示トグル

### 5-5. マイページ

| パス | ページ | 主な機能 |
|------|--------|---------|
| `/mypage/dashboard` | ダッシュボード | statsカード（シェブロンアイコン付き、モバイルでページ遷移） |
| `/mypage/events` | 申込済みイベント | タブ（すべて/開催予定/開催済み） |
| `/mypage/favorites` | お気に入り | ハートトグル付きカードリスト |
| `/mypage/notifications` | お知らせ | 未読/既読フィルター、カード型通知 |
| `/mypage/notification-settings` | お知らせ設定 | サイト内/メール通知トグル、頻度選択 |
| `/mypage/profile` | プロフィール | アバター、基本情報、カテゴリ、自己紹介 |
| `/mypage/account` | アカウント設定 | メール/パスワード変更、外部連携、アカウント削除 |
| `/mypage/settings` | 設定 | アカウント + 通知設定の統合ページ |

### 5-6. 404ページ（`*`）
- `text-gradient` の大きな「404」
- 「トップページに戻る」ボタン

---

## 6. 主催者管理画面

### 6-1. レイアウト

**ヘッダー**: ロゴ + 「主催者管理」バッジ + 「参加者サイト」リンク + ユーザーアイコン
**サイドバー**: ダークテーマ（`bg-primary`）、PC固定 `w-56`、モバイルFABで展開
**コンテンツ**: `max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8`
**フォーム系ページ**: 内部に `max-w-3xl` で狭幅レイアウト

### 6-2. サイドバーナビ

| ラベル | パス | activePage |
|-------|------|-----------|
| イベント申込者一覧 | `/org/applicants` | applicants |
| イベントページ一覧 | `/org/events` | events |
| イベント新規登録 | `/org/events/new` | new-event |
| アンケート設定 | `/org/surveys` | surveys |
| ターゲット設定 | `/org/targets` | targets |
| 企業設定 | `/org/company` | company |
| 担当者一覧 | `/org/staff` | staff |

### 6-3. ページ一覧

| パス | ページ | 主な機能 |
|------|--------|---------|
| `/org/applicants` | イベント申込者一覧 | 検索フィルター、テーブル(PC)/カード(モバイル)、CSV出力 |
| `/org/events` | イベントページ一覧 | タブ（すべて/受付中/公開前/下書き/終了）、stickyフィルター |
| `/org/events/new` | イベント新規登録 | 10セクションフォーム、セクションアイコン付き |
| `/org/events/:id/edit` | イベント編集 | 基本情報・チケット・ステータス編集 |
| `/org/surveys` | アンケート一覧 | タブ（使用可/アーカイブ/すべて）、テーブル |
| `/org/surveys/new` | アンケート新規作成 | アンケート名 + 質問カード追加 |
| `/org/surveys/:id` | アンケート編集 | 質問カード編集、回答選択肢追加/削除 |
| `/org/targets` | ターゲット編集 | ターゲット名、業種、従業員数等のフォーム |
| `/org/company` | 企業設定 | 表示名、URL、画像、連絡先、紹介文 |
| `/org/staff` | 担当者一覧 | テーブル、ステータスバッジ、設定リンク |
| `/org/staff/new` | 担当者追加 | 名前、メール、電話、権限フォーム |
| `/org/staff/:id` | 担当者設定 | 既存データ編集、削除 |

---

## 7. データモデル

### 参加者側ダミーデータ（`data/dummy.js`）

| データ | 内容 |
|--------|------|
| events | イベント20件（タイトル、日時、場所、カテゴリ、タグ、画像、定員、残席、価格等） |
| notifications | 通知10件（event/reminder/recommend/organizer/system） |
| user | ユーザー1名（鈴木一郎） |
| speakers | 講師3名 |
| categories | 12カテゴリ |
| areas | 7エリア |

### 主催者側ダミーデータ（`data/orgDummy.js`）

| データ | 内容 |
|--------|------|
| orgProfile | 企業情報（テックイノベーション株式会社） |
| orgStaff | 担当者3名 |
| orgEvents | イベント6件（受付中2、公開前1、終了2、下書き1） |
| orgApplicants | 申込者8名 |
| orgSurveys | アンケート3件 |
| orgTargets | ターゲット3件 |

---

## 8. ディレクトリ構成

```
src/
├── App.jsx                    # ルーティング定義、OrgPageラッパー、ScrollToTop
├── main.jsx                   # エントリーポイント（HashRouter）
├── index.css                  # デザイントークン + ユーティリティ
├── data/
│   ├── dummy.js               # 参加者側ダミーデータ
│   └── orgDummy.js            # 主催者側ダミーデータ
├── components/
│   ├── Header.jsx             # 参加者ヘッダー
│   ├── Footer.jsx             # フッター（モバイルアコーディオン対応）
│   ├── EventCard.jsx          # イベントカード（vertical/horizontal）
│   ├── MypageSidebar.jsx      # マイページタブ + モバイルボトムナビ
│   ├── OrgSidebar.jsx         # 主催者サイドバー（ダークテーマ）
│   └── OrgLayout.jsx          # 主催者レイアウト（未使用、App.jsxで直接定義）
└── pages/
    ├── HomePage.jsx
    ├── SearchPage.jsx
    ├── EventDetailPage.jsx
    ├── LoginPage.jsx
    ├── NotFoundPage.jsx
    ├── mypage/
    │   ├── DashboardPage.jsx
    │   ├── MyEventsPage.jsx
    │   ├── FavoritesPage.jsx
    │   ├── NotificationsPage.jsx
    │   ├── NotificationSettingsPage.jsx
    │   ├── AccountPage.jsx
    │   ├── ProfilePage.jsx
    │   └── SettingsPage.jsx
    └── org/
        ├── ApplicantsPage.jsx
        ├── EventsPage.jsx
        ├── EventEditPage.jsx
        ├── NewEventPage.jsx
        ├── SurveysPage.jsx
        ├── SurveyNewPage.jsx
        ├── SurveyEditPage.jsx
        ├── TargetEditPage.jsx
        ├── CompanyPage.jsx
        ├── StaffPage.jsx
        └── StaffEditPage.jsx
```

---

## 9. 参加者サイト ↔ 主催者管理の導線

**参加者 → 主催者:**
- PC: ユーザーメニュー内「主催者管理」（accent色）
- モバイル: ハンバーガーメニュー内「主催者管理」

**主催者 → 参加者:**
- ヘッダー右上「参加者サイト」リンク
- サイドバー下部「参加者サイトへ」リンク
