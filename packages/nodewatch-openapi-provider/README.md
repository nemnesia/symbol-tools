# @nemnesia/nodewatch-service

SymbolおよびNEMブロックチェーンノード向けのフェイルオーバー対応NodeWatchサービスクライアントです。

## 特徴

- SymbolおよびNEMノードのフェイルオーバー対応
- [@nemnesia/nodewatch-openapi-typescript-fetch-client](https://www.npmjs.com/package/@nemnesia/nodewatch-openapi-typescript-fetch-client)の上に構築
- TypeScript対応

## インストール方法

```bash
npm install @nemnesia/nodewatch-service @nemnesia/nodewatch-openapi-typescript-fetch-client
```

## 使い方

```typescript
import { createNEMNodeWatchApi, createSymbolNodeWatchApi } from '@nemnesia/nodewatch-service';

// SymbolノードAPIの作成
const symbolApi = createSymbolNodeWatchApi();

// NEMノードAPIの作成
const nemApi = createNEMNodeWatchApi();
```

## ライセンス

MIT
