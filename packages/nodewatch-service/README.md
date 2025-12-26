# @nemnesia/nodewatch-service

NodeWatch service client with failover support for Symbol and NEM blockchain nodes.

## Features

- Failover support for Symbol and NEM blockchain nodes
- Built on top of [@nemnesia/nodewatch-openapi-typescript-fetch-client](https://www.npmjs.com/package/@nemnesia/nodewatch-openapi-typescript-fetch-client)
- TypeScript support

## Installation

```bash
npm install @nemnesia/nodewatch-service
```

## Usage

```typescript
import { createSymbolNodesApi, createNEMNodesApi } from '@nemnesia/nodewatch-service';

// Create Symbol nodes API
const symbolApi = createSymbolNodesApi();

// Create NEM nodes API
const nemApi = createNEMNodesApi();
```

## License

MIT
