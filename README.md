# PixelForge

Transform your photos into pixel art masterpieces.

## 概要

PixelForgeは、写真をアップロードしてピクセル・ドット調の画像に変換するWebアプリケーションです。処理速度とユーザー体験を重視し、基本的な画像処理はフロントエンドで完結させています。

## 技術スタック

- **フロントエンド**: Next.js 14+ (App Router)
- **UIライブラリ**: Material-UI (MUI) v5
- **言語**: TypeScript
- **画像処理**: Canvas API
- **状態管理**: React Hooks
- **スタイリング**: MUI Theme System

## セットアップ手順

### 前提条件

- Node.js 18.0.0 以上
- Yarn パッケージマネージャー

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/tokuj/pixelforge_cc.git
cd pixelforge_cc
```

2. 依存関係をインストール
```bash
yarn install
```

3. 開発サーバーを起動
```bash
yarn dev
```

4. ブラウザで http://localhost:3000 を開く

### 利用可能なスクリプト

- `yarn dev` - 開発サーバーを起動
- `yarn build` - 本番用ビルドを作成
- `yarn start` - 本番用サーバーを起動
- `yarn lint` - ESLintによるコードチェック

## 開発状況

現在Phase 0（プロジェクトセットアップ）が完了しました。

### 完了済み
- ✅ Next.js プロジェクトの初期化
- ✅ MUI と TypeScript の設定
- ✅ 基本的なレイアウトコンポーネント
- ✅ テーマシステムの実装
- ✅ プロジェクト構造の構築

### 今後の予定
- 🔄 Phase 1: MVP（画像アップロード、基本的なピクセル化処理）
- 🔄 Phase 2: 拡張機能（プリセット、カラーパレット、エフェクト）
- 🔄 Phase 3: 共有機能
- 🔄 Phase 4: 最適化とポリッシュ

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
