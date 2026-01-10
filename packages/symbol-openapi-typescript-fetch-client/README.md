# @nemnesia/symbol-openapi-fetch-client

![npm version](https://img.shields.io/npm/v/@nemnesia/symbol-openapi-typescript-fetch-client?color=blue)
![types](https://img.shields.io/npm/types/@nemnesia/symbol-openapi-typescript-fetch-client)
![ESM only](https://img.shields.io/badge/ESM-only-blueviolet)

## 特徴

- OpenAPI 仕様に基づいて自動生成されたコード

## Swagger

- https://docs.symboltest.net/en/devbook/reference/rest/symbol/

## 使い方

### インストール

```sh
npm i @nemnesia/symbol-openapi-typescript-fetch-client
```

### サンプルコード

```ts
import { AccountRoutesApi, Configuration } from '@nemnesia/symbol-openapi-typescript-fetch-client';

const client = new AccountRoutesApi(new Configuration({ basePath: 'https://symbol-node.example.com:3001' }));

async function main() {
  const response = await client.getAccountInfo({
    accountId: 'TCEUGLPCMO5Y72EEISSNUKGTMCN5RO4PVYMK5FI',
  });
  console.log(response);
}

main();
```

## ライセンス

このプロジェクトは [Apache License 2.0](./LICENSE) の下でライセンスされています。
