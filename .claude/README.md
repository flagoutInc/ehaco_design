# メタエージェント構成（2体だけ）

## 思想
エージェントは多ければいいわけじゃない。
この2体がプロジェクトを見て、必要なエージェントを動的に増減する。

## 構成

```
あなた
  ↓ 「こういうの作りたい」
仕様管理AI（spec-manager）
  ↓ SPEC.md を作成・更新（履歴付き）
エージェント最適化AI（agent-optimizer）
  ↓ SPEC.md を見て最適なエージェントを生成・削除
実行エージェントたち（動的に増減）
  ↓ コーディング
```

## セットアップ

```bash
# プロジェクトのルートで
mkdir -p .claude/agents
cp meta-agents/.claude/agents/spec-manager.md .claude/agents/
cp meta-agents/.claude/agents/agent-optimizer.md .claude/agents/
```

## 使い方

### 新規プロジェクト開始時
```
> 仕様管理AIに、このプロジェクトの仕様を作成させて
> エージェント最適化AIに、最適なエージェント構成を生成させて
```

### 放置自動化
```bash
claude --permission-mode auto -p \
  "仕様管理AIでSPEC.mdを作成して、
   エージェント最適化AIで最適なエージェントを生成して、
   そのエージェントたちで実装して、
   完了したらgit commitして。"
```

### 仕様変更時
```
> 仕様管理AIに「ダークモード対応を追加」を反映させて
> エージェント最適化AIに構成を見直させて
```

## ファイル構成（自動生成される）

```
プロジェクト/
├── .claude/
│   └── agents/
│       ├── spec-manager.md        # 常駐（削除しない）
│       ├── agent-optimizer.md     # 常駐（削除しない）
│       ├── designer.md            # ← 最適化AIが動的に生成
│       ├── reviewer.md            # ← 最適化AIが動的に生成
│       └── (必要に応じて増減)
├── specs/
│   ├── SPEC.md                    # 現在の仕様
│   ├── CHANGELOG.md               # 変更履歴
│   ├── decisions/                 # 意思決定ログ
│   └── archive/                   # 過去の仕様
└── ...
```

## ECCとの共存
ECCを入れている場合でも、この2体はその上に載せるだけ。
ECCの汎用エージェントの代わりに、プロジェクト固有の
エージェントを動的に生成するレイヤーとして機能する。
