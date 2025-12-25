import { describe, expect, it } from 'vitest';

import { Configuration, SymbolNodesApi } from '../src/index.js';

describe('Generated API Client', () => {
  const client = new SymbolNodesApi(new Configuration({ basePath: 'https://nodewatch.symbol.tools' }));

  it('should fetch data from an endpoint', async () => {
    const response = await client.getSymbolPeerNodes({ onlySsl: true });
    expect(response).toBeDefined();
    expect(response[0].endpoint).toBeDefined();
  });

  it('should handle errors gracefully', async () => {
    try {
      await client.getSymbolNodeByMainPublicKey({
        mainPublicKey: 'invalidKey',
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect((error as Error).message).toContain('Response returned an error code');
    }
  });
});
