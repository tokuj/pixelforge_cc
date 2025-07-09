# PixelForge - ピクセルアート変換Webアプリケーション開発指示書

## プロジェクト概要
写真をアップロードすると、ピクセル・ドット調の画像に変換するWebアプリケーション「PixelForge」を開発してください。処理速度とユーザー体験を重視し、基本的な画像処理はフロントエンドで完結させ、共有機能のみバックエンドを使用します。

## アプリケーション情報
- **名称**: PixelForge
- **サブタイトル**: Transform your photos into pixel art masterpieces
- **プロジェクトID**: coproto-gcp
- **リージョン**: asia-northeast1

## 技術スタック
- **フロントエンド**: Next.js 14+ (App Router)
- **UIライブラリ**: Material-UI (MUI) v5
- **画像処理**: Canvas API（フロントエンド完結）
- **バックエンド**: Python + Google Cloud Functions（共有機能のみ）
- **ホスティング**: Google Cloud Run（フロントエンド）
- **ストレージ**: Google Cloud Storage（共有画像の一時保存）
- **データベース**: Firestore（共有URL管理）

## アーキテクチャ判断

### フロントエンド処理で完結させる機能
- **画像のピクセル化処理**: Canvas APIで十分高速
- **プリセット適用**: 事前定義のパラメータ適用
- **エフェクト処理**: リアルタイムで処理可能
- **画像ダウンロード**: Blob URLで実装

### バックエンドが必要な機能
- **共有機能**: 画像の一時保存とURL生成
- **アクセス統計**: 共有された画像の閲覧数カウント

## ブランディング実装

### ロゴ・アイコン配置
```
pixelforge/                        # リポジトリルート
├── images/                        # ブランドアセット
│   ├── logo.svg                  # 横長ロゴ（200x60）
│   ├── icon.svg                  # 正方形アイコン（256x256）
│   └── favicon.svg               # ファビコン（32x32）
├── app/                          # Next.js App Router
├── components/                   # Reactコンポーネント
└── public/                       # 静的ファイル
```

### ロゴの実装
```typescript
// components/common/Logo.tsx
import Image from 'next/image';
import logoSvg from '@/images/logo.svg';
import iconSvg from '@/images/icon.svg';

export const Logo: React.FC<{ variant?: 'full' | 'icon' }> = ({ variant = 'full' }) => {
  if (variant === 'icon') {
    return <Image src={iconSvg} alt="PixelForge" width={40} height={40} />;
  }
  return <Image src={logoSvg} alt="PixelForge" width={160} height={48} priority />;
};
```

### メタデータ設定
```typescript
// app/layout.tsx
import faviconSvg from '@/images/favicon.svg';
import iconSvg from '@/images/icon.svg';

export const metadata: Metadata = {
  title: 'PixelForge - Transform your photos into pixel art',
  description: 'Convert your images into stunning pixel art with customizable settings, presets, and effects.',
  icons: {
    icon: faviconSvg.src,
    apple: iconSvg.src,
  },
  openGraph: {
    title: 'PixelForge',
    description: 'Transform your photos into pixel art masterpieces',
    url: 'https://pixelforge-xxxxx-an.a.run.app',
    siteName: 'PixelForge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelForge',
    description: 'Transform your photos into pixel art masterpieces',
    images: ['/og-image.png'],
  },
};
```

### カラーパレット定義
```typescript
// styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const pixelForgeColors = {
  primary: '#45B7D1',      // 水色
  secondary: '#FF6B6B',    // 赤
  accent1: '#4ECDC4',      // 青緑
  accent2: '#96CEB4',      // 緑
  accent3: '#DDA0DD',      // 紫
  background: '#f8f9fa',
  surface: '#ffffff',
  text: '#333333',
};

export const pixelForgeTheme = createTheme({
  palette: {
    primary: {
      main: pixelForgeColors.primary,
      light: pixelForgeColors.accent1,
      dark: '#35a7c1',
    },
    secondary: {
      main: pixelForgeColors.secondary,
      light: pixelForgeColors.accent3,
      dark: '#ee5555',
    },
    success: {
      main: pixelForgeColors.accent2,
    },
    background: {
      default: pixelForgeColors.background,
      paper: pixelForgeColors.surface,
    },
    text: {
      primary: pixelForgeColors.text,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});
```

## スタイリング方針

### MUI（Material-UI）を採用
本プロジェクトでは、スタイリングにMUIを使用します。Tailwind CSSは使用しません。

#### 理由
1. **統一されたデザインシステム**: Material Designに準拠
2. **豊富なコンポーネント**: 必要なUIパーツが揃っている
3. **テーマシステム**: 一貫したカスタマイズが可能
4. **TypeScript対応**: 型安全な開発
5. **バンドルサイズ最適化**: 単一のCSSフレームワーク

#### スタイリング方法
- **コンポーネント**: MUIの既製コンポーネントを使用
- **カスタムスタイル**: `sx` prop、`styled` API、テーマカスタマイズ
- **レイアウト**: MUIの`Box`、`Grid`、`Stack`コンポーネント
- **レスポンシブ**: MUIのブレークポイントシステム

## 機能要件

### 1. 画像アップロード機能
- **入力方法**
  - ドラッグ&ドロップ
  - ファイル選択ボタン
  - クリップボードから貼り付け（Ctrl+V）
- **対応形式**: JPEG, PNG, GIF, WebP
- **最大ファイルサイズ**: 10MB
- **推奨画像サイズ**: 最大2048x2048px（それ以上は自動リサイズ）

### 2. ピクセル化処理
- **ピクセルサイズ**: 2px〜64px（スライダーで調整）
- **処理アルゴリズム**:
  ```
  1. 指定ピクセルサイズごとにグリッド分割
  2. 各グリッド内の平均色を計算
  3. グリッド全体をその平均色で塗りつぶし
  ```
- **リアルタイムプレビュー**: 250ms debounceで更新

### 3. プリセット機能
- **ゲーム機プリセット**:
  - ファミコン風（256×224px、52色パレット）
  - ゲームボーイ風（160×144px、4階調グリーン）
  - スーパーファミコン風（256×224px、32,768色から256色）
- **アートスタイルプリセット**:
  - 8ビットアート（ピクセルサイズ8px、256色）
  - 16ビットアート（ピクセルサイズ4px、65,536色）
  - モダンピクセルアート（ピクセルサイズ2px、フルカラー）
- **カスタムプリセット**: ユーザーが設定を保存（LocalStorage）

### 4. カラーパレット機能
- **色数制限**: 2, 4, 8, 16, 32, 64, 128, 256色
- **パレット選択**:
  - 自動生成（k-means法で代表色抽出）
  - プリセットパレット（レトロゲーム機パレット）
  - カスタムパレット（ユーザー定義）
- **ディザリング**: Floyd-Steinbergアルゴリズム（オプション）

### 5. エフェクト機能
- **カラーエフェクト**:
  - モノクロ
  - セピア
  - ネガティブ
  - カスタムカラーフィルター
- **後処理エフェクト**:
  - グリッドライン表示
  - スキャンライン効果
  - CRTモニター風湾曲

### 6. 共有機能
- **共有URL生成**: 
  - 短縮URL形式: `https://pixelforge-xxxxx-an.a.run.app/p/[8文字のID]`
  - 有効期限: 7日間
- **共有オプション**:
  - 処理済み画像のみ
  - 処理パラメータ付き（他のユーザーが同じ設定で編集可能）
- **SNS共有**: Twitter、Facebook、LINE対応
- **OGP対応**: 共有時のプレビュー画像自動生成

### 7. ダウンロード機能
- **形式選択**: PNG, JPEG, WebP
- **サイズオプション**:
  - オリジナルサイズ
  - 2倍、4倍、8倍拡大（ニアレストネイバー法）
- **メタデータ保持**: 元画像のEXIF情報を保持するオプション

## プロジェクト構造

```
pixelforge/
├── images/                         # ブランドアセット
│   ├── logo.svg                   # 横長ロゴ
│   ├── icon.svg                   # アプリアイコン
│   └── favicon.svg                # ファビコン
├── app/
│   ├── page.tsx                   # メインページ
│   ├── layout.tsx                 # レイアウト定義
│   ├── globals.css                # グローバルスタイル
│   ├── p/[id]/page.tsx           # 共有ページ
│   └── api/
│       ├── share/
│       │   └── route.ts          # 共有API
│       └── shared/[id]/
│           └── route.ts          # 共有画像取得API
├── components/
│   ├── ImageUploader/
│   │   ├── index.tsx             # メインコンポーネント
│   │   ├── DropZone.tsx          # ドロップゾーン
│   │   └── ClipboardHandler.tsx  # クリップボード処理
│   ├── PixelConverter/
│   │   ├── index.tsx             # メインコンポーネント
│   │   ├── Canvas.tsx            # Canvas描画
│   │   └── Controls.tsx          # 設定コントロール
│   ├── PresetSelector/
│   │   ├── index.tsx             # プリセット選択UI
│   │   ├── PresetCard.tsx        # プリセットカード
│   │   └── CustomPresetDialog.tsx # カスタムプリセット作成
│   ├── ColorPalette/
│   │   ├── index.tsx             # パレット管理
│   │   ├── PaletteEditor.tsx     # パレット編集
│   │   └── ColorPicker.tsx       # 色選択
│   ├── ShareDialog/
│   │   ├── index.tsx             # 共有ダイアログ
│   │   └── SocialButtons.tsx     # SNSシェアボタン
│   ├── layout/
│   │   ├── Header.tsx            # ヘッダー
│   │   └── Footer.tsx            # フッター
│   └── common/
│       ├── Logo.tsx              # ロゴコンポーネント
│       ├── LoadingOverlay.tsx    # ローディング表示
│       └── ErrorBoundary.tsx     # エラーハンドリング
├── lib/
│   ├── pixelate/
│   │   ├── core.ts              # ピクセル化コアロジック
│   │   ├── dithering.ts         # ディザリング処理
│   │   ├── colorQuantization.ts # 色数削減アルゴリズム
│   │   └── effects.ts           # エフェクト処理
│   ├── presets/
│   │   ├── index.ts             # プリセット定義
│   │   └── gameConsoles.ts      # ゲーム機プリセット
│   ├── share/
│   │   └── urlGenerator.ts      # URL生成ロジック
│   ├── config.ts                # アプリ設定
│   └── utils/
│       ├── imageUtils.ts        # 画像処理ユーティリティ
│       └── colorUtils.ts        # 色計算ユーティリティ
├── hooks/
│   ├── useImageProcessing.ts    # 画像処理フック
│   ├── usePresets.ts           # プリセット管理フック
│   └── useShare.ts             # 共有機能フック
├── types/
│   ├── image.ts                # 画像関連の型定義
│   └── preset.ts               # プリセットの型定義
├── styles/
│   └── theme.ts                # MUIテーマ設定
├── public/
│   ├── manifest.json           # PWAマニフェスト
│   └── og-image.png           # OGP画像
├── functions/                   # Google Cloud Functions
│   ├── requirements.txt
│   ├── main.py                 # エントリーポイント
│   ├── share_handler.py        # 共有処理
│   └── storage_manager.py      # GCS操作
├── Dockerfile                   # Cloud Run用
├── next.config.js              # Next.js設定
├── package.json
├── tsconfig.json
├── .env.production             # 本番環境変数
├── cloudbuild.yaml             # Cloud Run デプロイ設定
└── cloudbuild-functions.yaml   # Cloud Functions デプロイ設定
```

## 実装詳細

### フロントエンド実装

#### 1. 画像処理パイプライン
```typescript
// lib/pixelate/core.ts
export class PixelArtProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private worker?: Worker;

  async process(image: ImageData, options: ProcessOptions): Promise<ImageData> {
    // 大きな画像の場合はWeb Workerを使用
    if (image.width * image.height > 1_000_000) {
      return this.processInWorker(image, options);
    }
    
    return this.processInMainThread(image, options);
  }

  private processInMainThread(image: ImageData, options: ProcessOptions): ImageData {
    const { pixelSize, colorPalette, useDithering } = options;
    
    // ピクセル化処理
    const pixelated = this.pixelate(image, pixelSize);
    
    // カラーパレット適用
    if (colorPalette) {
      return this.applyColorPalette(pixelated, colorPalette, useDithering);
    }
    
    return pixelated;
  }
}
```

#### 2. プリセットシステム
```typescript
// lib/presets/index.ts
export interface Preset {
  id: string;
  name: string;
  icon: string;
  category: 'console' | 'art' | 'custom';
  settings: {
    pixelSize: number;
    colorPalette?: Color[];
    colorCount?: number;
    effects?: Effect[];
    outputSize?: { width: number; height: number };
    dithering?: boolean;
  };
}

// LocalStorageでカスタムプリセットを管理
export class PresetManager {
  private readonly STORAGE_KEY = 'pixelforge_custom_presets';
  
  saveCustomPreset(preset: Preset): void {
    const presets = this.loadCustomPresets();
    presets.push(preset);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(presets));
  }
  
  loadCustomPresets(): Preset[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  
  deleteCustomPreset(id: string): void {
    const presets = this.loadCustomPresets();
    const filtered = presets.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}
```

#### 3. 共有機能実装
```typescript
// hooks/useShare.ts
export function useShare() {
  const [isSharing, setIsSharing] = useState(false);
  
  const shareImage = async (
    imageBlob: Blob,
    settings: ProcessSettings
  ): Promise<ShareResult> => {
    setIsSharing(true);
    
    try {
      const formData = new FormData();
      formData.append('image', imageBlob);
      formData.append('settings', JSON.stringify(settings));
      
      const response = await fetch('/api/share', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Share failed');
      }
      
      const result = await response.json();
      return {
        shareId: result.shareId,
        shareUrl: result.shareUrl,
        expiresAt: result.expiresAt,
      };
    } finally {
      setIsSharing(false);
    }
  };
  
  return { shareImage, isSharing };
}
```

### バックエンド実装（Google Cloud Functions）

#### 1. 共有エンドポイント
```python
# functions/main.py
import functions_framework
from share_handler import create_share
from storage_manager import StorageManager
import json

@functions_framework.http
def pixelforge_share(request):
    """画像共有エンドポイント"""
    # CORS対応
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)
    
    if request.method != 'POST':
        return {'error': 'Method not allowed'}, 405
    
    # 画像とメタデータを取得
    image_file = request.files.get('image')
    settings = request.form.get('settings')
    
    if not image_file:
        return {'error': 'No image provided'}, 400
    
    # GCSに保存
    storage = StorageManager()
    image_url = storage.upload_image(image_file)
    
    # Firestoreに共有情報を保存
    share_id = create_share(image_url, json.loads(settings))
    
    return {
        'shareId': share_id,
        'shareUrl': f'https://pixelforge-xxxxx-an.a.run.app/p/{share_id}',
        'expiresAt': '7 days from now'
    }
```

#### 2. ストレージ管理
```python
# functions/storage_manager.py
from google.cloud import storage
import uuid
from datetime import datetime, timedelta

class StorageManager:
    def __init__(self):
        self.client = storage.Client()
        self.bucket = self.client.bucket('coproto-gcp-pixelforge-shares')
    
    def upload_image(self, image_file, expiry_days=7):
        # ユニークなファイル名を生成
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        blob_name = f"{timestamp}_{uuid.uuid4().hex[:8]}.png"
        blob = self.bucket.blob(blob_name)
        
        # メタデータを設定
        blob.metadata = {
            'uploaded_at': datetime.now().isoformat(),
            'expires_at': (datetime.now() + timedelta(days=expiry_days)).isoformat()
        }
        
        # アップロード
        blob.upload_from_file(
            image_file,
            content_type='image/png'
        )
        
        # 公開URLを返す
        return blob.public_url
```

## パフォーマンス最適化

### 1. 画像処理の最適化
- **チャンク処理**: 大きな画像を分割して処理
- **Web Worker活用**: メインスレッドのブロックを防止
- **キャッシング**: 処理結果をメモリキャッシュ
- **遅延処理**: スライダー操作時はdebounce/throttle

### 2. メモリ管理
```typescript
// 使用後のリソースを解放
function cleanup() {
  canvas.width = 0;
  canvas.height = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(blobUrl);
}
```

### 3. 共有機能の最適化
- **画像圧縮**: 共有前に画像を最適化
- **CDN配信**: Cloud CDNでグローバル配信
- **キャッシュ戦略**: 7日間のブラウザキャッシュ

## セキュリティ考慮事項

1. **アップロードの検証**
   - ファイルタイプの厳密なチェック
   - ファイルサイズ制限の実装
   - 悪意のあるコンテンツのスキャン

2. **共有機能のセキュリティ**
   - レート制限（1分間に5回まで）
   - 一時URLの使用期限設定
   - XSS対策

## デプロイ設定

### Google Cloud Run設定（フロントエンド）
```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# 依存関係のインストール
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 実行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080
ENV PORT 8080

CMD ["node", "server.js"]
```

```yaml
# cloudbuild.yaml (フロントエンド用)
steps:
  # Dockerイメージをビルド
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/coproto-gcp/pixelforge', '.']
  
  # イメージをContainer Registryにプッシュ
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/coproto-gcp/pixelforge']
  
  # Cloud Runにデプロイ
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'pixelforge'
      - '--image=gcr.io/coproto-gcp/pixelforge'
      - '--region=asia-northeast1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--memory=1Gi'
      - '--cpu=1'
      - '--max-instances=10'
      - '--min-instances=0'
      - '--set-env-vars=PROJECT_ID=coproto-gcp,NEXT_PUBLIC_API_URL=https://asia-northeast1-coproto-gcp.cloudfunctions.net'

images:
  - 'gcr.io/coproto-gcp/pixelforge'
```

```json
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['storage.googleapis.com'],
  },
  env: {
    PROJECT_ID: 'coproto-gcp',
    GCS_BUCKET: 'coproto-gcp-pixelforge-shares',
  },
}

module.exports = nextConfig
```

### Google Cloud Functions設定（バックエンド）
```yaml
# cloudbuild-functions.yaml
steps:
  # Cloud Functionsをデプロイ
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'functions'
      - 'deploy'
      - 'pixelforge-share'
      - '--entry-point=pixelforge_share'
      - '--runtime=python311'
      - '--trigger-http'
      - '--allow-unauthenticated'
      - '--region=asia-northeast1'
      - '--memory=512MB'
      - '--timeout=60s'
      - '--max-instances=100'
      - '--set-env-vars=PROJECT_ID=coproto-gcp,BUCKET_NAME=coproto-gcp-pixelforge-shares,SHARE_EXPIRY_DAYS=7'
      - '--source=./functions'
```

### デプロイコマンド
```bash
# アプリケーション名を環境変数に設定
export APP_NAME=pixelforge

# フロントエンド（Cloud Run）のデプロイ
gcloud builds submit --config cloudbuild.yaml --project coproto-gcp

# バックエンド（Cloud Functions）のデプロイ
gcloud builds submit --config cloudbuild-functions.yaml --project coproto-gcp

# 必要なGCPサービスの有効化
gcloud services enable run.googleapis.com cloudfunctions.googleapis.com \
  cloudbuild.googleapis.com storage.googleapis.com firestore.googleapis.com \
  --project coproto-gcp

# GCSバケットの作成（PixelForge専用）
gsutil mb -p coproto-gcp -c standard -l asia-northeast1 \
  gs://coproto-gcp-pixelforge-shares/

# バケットのライフサイクル設定（7日後に自動削除）
cat > lifecycle.json << EOF
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {"age": 7}
      }
    ]
  }
}
EOF
gsutil lifecycle set lifecycle.json gs://coproto-gcp-pixelforge-shares/
```

## 環境変数設定

### フロントエンド環境変数
```env
# .env.production
PROJECT_ID=coproto-gcp
NEXT_PUBLIC_API_URL=https://asia-northeast1-coproto-gcp.cloudfunctions.net
NEXT_PUBLIC_SHARE_BASE_URL=https://pixelforge-xxxxx-an.a.run.app
NEXT_PUBLIC_GCS_BUCKET=coproto-gcp-pixelforge-shares
```

### API エンドポイント設定
```typescript
// lib/config.ts
export const config = {
  projectId: 'coproto-gcp',
  api: {
    shareEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/pixelforge-share`,
    getSharedEndpoint: (id: string) => 
      `${process.env.NEXT_PUBLIC_API_URL}/pixelforge-get?id=${id}`,
  },
  storage: {
    bucketName: 'coproto-gcp-pixelforge-shares',
    publicUrl: (filename: string) => 
      `https://storage.googleapis.com/coproto-gcp-pixelforge-shares/${filename}`,
  },
  share: {
    baseUrl: process.env.NEXT_PUBLIC_SHARE_BASE_URL || 'http://localhost:3000',
  },
};
```

## IAM設定

```bash
# Cloud RunからCloud Functions/GCSへのアクセス権限設定
gcloud projects add-iam-policy-binding coproto-gcp \
  --member="serviceAccount:pixelforge@coproto-gcp.iam.gserviceaccount.com" \
  --role="roles/cloudfunctions.invoker"

gcloud projects add-iam-policy-binding coproto-gcp \
  --member="serviceAccount:pixelforge@coproto-gcp.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"

# Cloud FunctionsからGCS/Firestoreへのアクセス権限設定
gcloud projects add-iam-policy-binding coproto-gcp \
  --member="serviceAccount:coproto-gcp@appspot.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

gcloud projects add-iam-policy-binding coproto-gcp \
  --member="serviceAccount:coproto-gcp@appspot.gserviceaccount.com" \
  --role="roles/datastore.user"
```

## CI/CD設定

### GitHub Actions設定
```yaml
# .github/workflows/deploy.yml
name: Deploy to Google Cloud

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  PROJECT_ID: coproto-gcp
  REGION: asia-northeast1

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - id: 'auth'
        uses: 'google-github-actions/auth@v1'
        with:
          credentials_json: '${{ secrets.GCP_SA_KEY }}'
      
      - name: 'Set up Cloud SDK'
        uses: 'google-github-actions/setup-gcloud@v1'
      
      - name: 'Configure Docker'
        run: gcloud auth configure-docker
      
      - name: 'Build and Deploy to Cloud Run'
        run: |
          gcloud builds submit \
            --config cloudbuild.yaml \
            --project $PROJECT_ID

  deploy-functions:
    runs-on: ubuntu-latest
    needs: deploy-frontend
    steps:
      - uses: actions/checkout@v3
      
      - id: 'auth'
        uses: 'google-github-actions/auth@v1'
        with:
          credentials_json: '${{ secrets.GCP_SA_KEY }}'
      
      - name: 'Set up Cloud SDK'
        uses: 'google-github-actions/setup-gcloud@v1'
      
      - name: 'Deploy Cloud Functions'
        run: |
          gcloud builds submit \
            --config cloudbuild-functions.yaml \
            --project $PROJECT_ID
```

## モニタリング設定

```yaml
# monitoring/alerts.yaml
displayName: "PixelForge Alerts"
conditions:
  - displayName: "High Error Rate"
    conditionThreshold:
      filter: |
        resource.type="cloud_run_revision"
        resource.labels.service_name="pixelforge"
        metric.type="run.googleapis.com/request_count"
        metric.labels.response_code_class!="2xx"
      comparison: COMPARISON_GT
      thresholdValue: 10
      duration: 60s

  - displayName: "High Latency"
    conditionThreshold:
      filter: |
        resource.type="cloud_run_revision"
        resource.labels.service_name="pixelforge"
        metric.type="run.googleapis.com/request_latencies"
      comparison: COMPARISON_GT
      thresholdValue: 2000  # 2秒
      duration: 300s
```

## 作業ログの記録

### 概要
開発中の作業内容、直面した課題、解決方法、感情の変化などを記録することで、開発プロセスの透明性を高め、将来の参考資料とします。

### 記録方法
1. リポジトリトップに `worklog/` ディレクトリを作成
2. 各作業セッションで `WORKLOG_YYYYMMDD_HHMMSS.md` ファイルを作成
3. 重要な決定、課題、解決策、感情を都度記録
4. すべてのログファイルは保持され、履歴として残る

### ディレクトリ構造
```
pixelforge/
├── worklog/
│   ├── WORKLOG_20240101_120000.md
│   ├── WORKLOG_20240101_150000.md
│   └── WORKLOG_20240102_100000.md
```

### 記録する内容
- **作業内容**: 実装した機能、修正したバグ
- **技術的決定**: アーキテクチャやライブラリの選択理由
- **直面した課題**: エラー、パフォーマンス問題、設計の迷い
- **解決方法**: 問題をどう解決したか、参考にした資料
- **感情の記録**: 達成感、フラストレーション、学びの瞬間
- **動作確認結果**: ブラウザでの表示確認、機能テスト結果
- **TODO**: 次回に持ち越すタスク

### ワークログファイルの作成コマンド
```bash
# worklogディレクトリがなければ作成
mkdir -p worklog

# 新しいワークログファイルを作成
timestamp=$(date +%Y%m%d_%H%M%S)
cat > worklog/WORKLOG_${timestamp}.md << 'EOF'
# PixelForge 開発ワークログ

**日時**: YYYY-MM-DD HH:MM - HH:MM  
**MVP**: MVP X - [MVP名]  
**ブランチ**: feature/mvp-X-xxx  

## 🎯 本日の目標
- [ ] 実装するタスク
- [ ] 動作確認

## 📝 作業ログ

### HH:MM - 作業開始
- 作業環境の準備
- 前回からの引き継ぎ事項確認
- 気持ち: 

### HH:MM - [作業内容]
**実装内容**:
- 何を実装したか

**使用した技術/ライブラリ**:
- 

**直面した課題**:
- エラーメッセージ:
```
エラー内容
```

**解決方法**:
- どのように解決したか
- 参考URL: 

**感情**: 
- 😊 / 😤 / 💡 / 😅 / 🤔 / 📚

### HH:MM - 動作確認
**確認URL**: http://localhost:3000  
**確認内容**:
- [ ] 機能が正しく動作する
- [ ] UIが期待通り表示される
- [ ] エラーが発生しない
- [ ] レスポンシブ対応（該当する場合）

**スクリーンショット**:
```
[スクリーンショットの説明]
```

### HH:MM - コミット
```bash
git add .
git commit -m "feat: [コミットメッセージ]"
```

## 💡 学んだこと
- 新しく学んだ技術や概念
- 今後活かせそうな知見

## 🚧 次回への申し送り
- 未完了のタスク
- 改善が必要な箇所
- 次に実装すべき機能

## 📊 セッション要約
- **完了したタスク**: X個
- **作業時間**: X時間X分
- **主な成果**: 
  - 成果1
  - 成果2
- **全体的な感想**: 

---

## 使用する絵文字ガイド
- 😊 達成感・喜び
- 😤 フラストレーション
- 💡 新しい発見・アイデア
- 😅 安堵
- 🤔 迷い・検討中
- 📚 学習・理解
- 🐛 バグ発見
- ✅ タスク完了
- 🚧 作業中
- ⚡ パフォーマンス改善
- 🎨 UI/UXに関する作業
- 🔧 リファクタリング
- 📝 ドキュメント作成
EOF

echo "作業ログを作成しました: worklog/WORKLOG_${timestamp}.md"
```

### 感情の記録例
- 😊 達成感: 機能が期待通りに動作した
- 😤 フラストレーション: 原因不明のバグに2時間費やした
- 💡 発見: より良い実装方法を見つけた
- 😅 安堵: ようやくエラーを解決できた
- 🤔 迷い: 設計判断で悩んでいる
- 📚 学び: 新しい概念を理解できた

### MVP完了時の振り返り
各MVP完了時には、以下の振り返りセクションを追加：

```markdown
# PixelForge 開発ワークログ

**日時**: YYYY-MM-DD HH:MM - HH:MM  
**総作業時間**: XX時間  
**セッション数**: X回

## 📈 成果
- 実装した主な機能
- 解決した技術的課題

## 🔍 振り返り
- **うまくいったこと**:
- **改善が必要なこと**:
- **予想外だったこと**:

## 📝 教訓
- 次のMVPに活かせる学び
- 同様のプロジェクトへのアドバイス
```

## 開発フロー

### MVP駆動開発
各フェーズを小さなMVP（Minimum Viable Product）に分割し、段階的に機能を追加していきます。各MVPは独立して動作確認が可能で、ユーザーがブラウザで成果を確認できます。

### ブランチ戦略
- `main`: 本番環境用ブランチ
- `develop`: 開発統合ブランチ
- `feature/mvp-X-[mvp-name]`: 各MVP用のフィーチャーブランチ

### プルリクエストルール
1. 各MVPごとに専用のブランチを作成
2. MVP完了時にプルリクエストを作成
3. PRタイトル: `[MVP X] MVP名`
4. ブラウザで動作確認可能な状態でPR作成
5. レビュー後にdevelopブランチにマージ

## 開発ロードマップ（MVP駆動）

### MVP 0: プロジェクト基盤
**ブランチ名**: `feature/mvp-0-project-setup`
**目標**: Next.jsプロジェクトが起動し、PixelForgeのロゴが表示される

- [ ] developブランチの作成
- [ ] feature/mvp-0-project-setupブランチの作成
- [ ] worklogディレクトリの作成とテンプレート設置
- [ ] Next.jsプロジェクトの作成
- [ ] 基本的なレイアウト（ヘッダーにロゴ表示）
- [ ] 動作確認: http://localhost:3000 でロゴが表示される
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 0] プロジェクト基盤構築`

### MVP 1: 画像アップロード機能
**ブランチ名**: `feature/mvp-1-image-upload`
**目標**: 画像をドラッグ&ドロップでアップロードし、プレビュー表示できる

- [ ] feature/mvp-1-image-uploadブランチの作成
- [ ] MUIのインストールと設定
- [ ] ImageUploaderコンポーネントの基本実装
- [ ] ドラッグ&ドロップエリアの作成
- [ ] 画像プレビュー機能
- [ ] ファイルサイズ・形式の検証
- [ ] 動作確認: 画像をドロップしてプレビューが表示される
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 1] 画像アップロード機能`

### MVP 2: 基本的なピクセル化
**ブランチ名**: `feature/mvp-2-basic-pixelation`
**目標**: アップロードした画像を固定サイズ（8px）でピクセル化できる

- [ ] feature/mvp-2-basic-pixelationブランチの作成
- [ ] PixelConverterコンポーネントの作成
- [ ] Canvas要素での画像処理実装
- [ ] 固定8pxピクセル化アルゴリズム
- [ ] 処理ボタンの追加
- [ ] 処理結果の表示
- [ ] 動作確認: 画像をピクセル化して結果が表示される
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 2] 基本的なピクセル化機能`

### MVP 3: ダウンロード機能
**ブランチ名**: `feature/mvp-3-download`
**目標**: ピクセル化した画像をPNG形式でダウンロードできる

- [ ] feature/mvp-3-downloadブランチの作成
- [ ] ダウンロードボタンの実装
- [ ] Canvas to Blob変換
- [ ] ファイル名の自動生成
- [ ] ダウンロード処理の実装
- [ ] 動作確認: 処理済み画像がダウンロードできる
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 3] ダウンロード機能`

### MVP 4: ピクセルサイズ調整
**ブランチ名**: `feature/mvp-4-pixel-size`
**目標**: スライダーでピクセルサイズを2-64pxの範囲で調整できる

- [ ] feature/mvp-4-pixel-sizeブランチの作成
- [ ] MUIスライダーの実装
- [ ] 可変ピクセルサイズ対応
- [ ] リアルタイムプレビュー（debounce付き）
- [ ] スライダー値の表示
- [ ] 動作確認: スライダーでピクセルサイズが変更できる
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 4] ピクセルサイズ調整機能`

### MVP 5: UI/UXの向上
**ブランチ名**: `feature/mvp-5-ui-polish`
**目標**: ローディング状態、エラー処理、レスポンシブ対応

- [ ] feature/mvp-5-ui-polishブランチの作成
- [ ] ローディングスピナーの追加
- [ ] エラー時のフィードバック
- [ ] レスポンシブデザイン対応
- [ ] ヘッダー・フッターの完成
- [ ] 動作確認: スマホでも適切に表示される
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 5] UI/UX向上`

### MVP 6: プリセット機能（基本）
**ブランチ名**: `feature/mvp-6-basic-presets`
**目標**: 3つの基本プリセット（8bit、16bit、モダン）を選択できる

- [ ] feature/mvp-6-basic-presetsブランチの作成
- [ ] PresetSelectorコンポーネントの作成
- [ ] 基本プリセットの定義
- [ ] プリセット選択UI
- [ ] プリセット適用ロジック
- [ ] 動作確認: プリセットを選んで適用できる
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 6] 基本プリセット機能`

### MVP 7: カラーパレット（基本）
**ブランチ名**: `feature/mvp-7-color-palette`
**目標**: 色数を制限できる（8、16、32、64色）

- [ ] feature/mvp-7-color-paletteブランチの作成
- [ ] 色数制限のUI追加
- [ ] 色数削減アルゴリズムの実装
- [ ] カラーパレット表示
- [ ] 動作確認: 色数を変更して結果が反映される
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 7] 基本カラーパレット機能`

### MVP 8: エフェクト機能
**ブランチ名**: `feature/mvp-8-effects`
**目標**: モノクロ、セピアなどの基本エフェクトを適用できる

- [ ] feature/mvp-8-effectsブランチの作成
- [ ] エフェクト選択UI
- [ ] モノクロ変換の実装
- [ ] セピア変換の実装
- [ ] エフェクトのオン/オフ切り替え
- [ ] 動作確認: エフェクトが適用される
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 8] エフェクト機能`

### MVP 9: 処理前後の比較
**ブランチ名**: `feature/mvp-9-comparison`
**目標**: オリジナル画像と処理後の画像を並べて比較できる

- [ ] feature/mvp-9-comparisonブランチの作成
- [ ] 比較ビューのレイアウト
- [ ] スライダーでの比較機能
- [ ] ビフォーアフター表示
- [ ] 動作確認: 処理前後を比較できる
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 9] 画像比較機能`

### MVP 10: パフォーマンス最適化
**ブランチ名**: `feature/mvp-10-performance`
**目標**: 大きな画像でもスムーズに処理できる

- [ ] feature/mvp-10-performanceブランチの作成
- [ ] Web Workerの実装（1MB以上の画像用）
- [ ] 画像リサイズ機能
- [ ] メモリ管理の改善
- [ ] プログレスバーの追加
- [ ] 動作確認: 大きな画像でも処理できる
- [ ] ワークログ作成: WORKLOG_[timestamp].md
- [ ] PR作成: `[MVP 10] パフォーマンス最適化`

## 開発開始手順

前提：リポジトリは既にクローンされており、images/ディレクトリにロゴアセットが配置されている状態

### 0. Git初期設定とワークログ準備
```bash
# worklogディレクトリを作成
mkdir -p worklog

# 最初のワークログを作成
timestamp=$(date +%Y%m%d_%H%M%S)
cat > worklog/WORKLOG_${timestamp}.md << 'EOF'
# PixelForge 開発ワークログ

**日時**: YYYY-MM-DD HH:MM - HH:MM  
**MVP**: MVP 0 - プロジェクト基盤  
**ブランチ**: feature/mvp-0-project-setup  

## 🎯 本日の目標
- [ ] Next.jsプロジェクトのセットアップ
- [ ] PixelForgeロゴの表示
- [ ] 動作確認

## 📝 作業ログ

### HH:MM - 作業開始
- リポジトリをクローン済み
- images/ディレクトリにロゴアセット確認
- 気持ち: 😊 新プロジェクトスタート！

（以下、テンプレートに従って記録）
EOF

echo "作業ログを作成しました: worklog/WORKLOG_${timestamp}.md"

# developブランチの作成
git checkout -b develop
git push -u origin develop

# MVP 0のブランチ作成
git checkout -b feature/mvp-0-project-setup
```

### 1. Next.jsプロジェクトの作成
```bash
# 既存のpackage.jsonがある場合は一時退避
if [ -f package.json ]; then
  mv package.json package.json.backup
fi

# npxでNext.jsプロジェクトを作成（Tailwindなし）
npx create-next-app@latest . --typescript --app --no-tailwind --no-src-dir --import-alias "@/*" --use-npm

# プロンプトへの回答:
# - Would you like to use ESLint? → Yes
# - Would you like to use Tailwind CSS? → No（自動でNoになるはず）

# 既存のファイルがある場合の選択:
# - README.md: n（既存のものを保持）
# - その他: y（新規作成を許可）

# package.json.backupがある場合は確認後削除
if [ -f package.json.backup ]; then
  echo "既存のpackage.jsonを確認:"
  cat package.json.backup
  rm package.json.backup
fi
```

### 2. 必要なパッケージのインストール
```bash
# MUIと関連パッケージ
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# 画像処理関連
npm install react-dropzone

# ユーティリティ
npm install lodash
npm install --save-dev @types/lodash

# 追加の型定義（必要に応じて）
npm install --save-dev @types/node
```

### 3. プロジェクト構造の作成（段階的に）
```bash
# MVP 0で必要な最小限のディレクトリのみ作成
mkdir -p components/common
mkdir -p components/layout
mkdir -p styles

# 以降のディレクトリは各MVPで必要になったときに作成
```

### 4. 開発サーバーの起動
```bash
npm run dev
# ブラウザで http://localhost:3000 を開いて確認
```

### 5. Git設定
```bash
# .gitignoreに追加
echo "*.log" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "worklog/" >> .gitignore  # ワークログはGitに含めない場合
```

### 6. MVP 0完了時のコミットとPR
```bash
# 変更内容を確認
git status

# ステージングとコミット
git add .
git commit -m "feat(mvp-0): プロジェクト基盤構築

- Next.js 14 (App Router) セットアップ
- MUIとEmotionの導入
- PixelForgeロゴの表示
- 基本レイアウトの実装"

# プッシュしてPRを作成
git push -u origin feature/mvp-0-project-setup
# GitHubでPRを作成: feature/mvp-0-project-setup → develop
```

## プルリクエストテンプレート

```markdown
## 概要
[MVP X] の実装が完了しました。

## 🎯 実装した機能
- 機能1
- 機能2

## 🖥️ 動作確認方法
1. `npm run dev` でサーバーを起動
2. http://localhost:3000 にアクセス
3. [具体的な操作手順]

## 📸 スクリーンショット
[動作している画面のスクリーンショット]

## ✅ チェックリスト
- [ ] ブラウザで動作確認済み
- [ ] エラーハンドリング実装済み
- [ ] レスポンシブ対応（該当する場合）
- [ ] コンソールエラーなし

## 📝 ワークログ
- worklog/WORKLOG_YYYYMMDD_HHMMSS.md を参照

## 🚧 今後の課題
- あれば記載
```

## よくあるエラーと対処法

### 1. npx create-next-app でのlicenseエラー
```
Error: warning package.json: No license field
```

**原因**: 既存のpackage.jsonにlicenseフィールドがない

**対処法**: 
```bash
# 既存のpackage.jsonを一時退避
mv package.json package.json.backup
# create-next-appを実行
npx create-next-app@latest . --typescript --app --no-tailwind --no-src-dir --import-alias "@/*" --use-npm
# 必要に応じて既存の設定をマージ
```

### 2. ポート3000が使用中
```
Error: Port 3000 is already in use
```

**対処法**:
```bash
# 別のポートで起動
PORT=3001 npm run dev
# または、使用中のプロセスを確認して終了
lsof -i :3000
kill -9 [PID]
```

### 3. MUIとEmotionの競合
```
Error: You are loading @emotion/react when it is already loaded
```

**対処法**: Next.jsの設定でEmotionを最適化
```javascript
// next.config.js
module.exports = {
  compiler: {
    emotion: true,
  },
}
```

### 4. npmとyarnの混在エラー
```
Error: Your project has both yarn.lock and package-lock.json
```

**対処法**:
```bash
# npmを使用する場合
rm yarn.lock
npm install
```

この仕様書のTODOリストに従って、MVPごとに段階的に実装を進めてください。各MVPが完了したら、ブラウザで動作確認を行い、ワークログを作成してからPRを送信してください。
