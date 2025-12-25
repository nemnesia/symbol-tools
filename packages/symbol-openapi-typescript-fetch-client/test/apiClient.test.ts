import { describe, expect, it } from 'vitest';

import { AccountRoutesApi, Configuration } from '../src';

describe('Generated API Client', () => {
  const client = new AccountRoutesApi(new Configuration({ basePath: 'https://reference.symboltest.net:3001' }));

  it('should fetch data from an endpoint', async () => {
    const response = await client.getAccountInfo({
      accountId: 'TCEUGLPCMO5Y72EEISSNUKGTMCN5RO4PVYMK5FI',
    });
    expect(response).toBeDefined();
    expect(response.account).toBeInstanceOf(Object);
  });

  it('should handle errors gracefully', async () => {
    try {
      await client.getAccountInfo({ accountId: '' });
    } catch (error) {
      expect(error).toBeDefined();
      expect((error as Error).message).toContain('Response returned an error code');
    }
  });
});
