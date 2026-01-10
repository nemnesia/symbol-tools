import { describe, expect, it } from 'vitest';

import { AccountRoutesApi, Configuration, ReceiptRoutesApi, TransactionRoutesApi } from '../src/index.js';

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

describe('TransactionRoutesApi', () => {
  const client = new TransactionRoutesApi(new Configuration({ basePath: 'https://sakia.harvestasya.com:3001' }));

  it('should fetch transaction info 1-100', async () => {
    const response = await client.searchConfirmedTransactions({
      address: 'NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA',
      embedded: false,
      pageSize: 100,
    });
    expect(response).toBeDefined();
  });

  it('should fetch transaction info 101-200', async () => {
    const response = await client.searchConfirmedTransactions({
      address: 'NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA',
      embedded: false,
      pageSize: 100,
      pageNumber: 2,
    });
    expect(response).toBeDefined();
  });

  it('should fetch transaction info 1-100 embedded', async () => {
    const response = await client.searchConfirmedTransactions({
      address: 'NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA',
      embedded: true,
      pageSize: 100,
    });
    expect(response).toBeDefined();
  });

  it('should fetch transaction info 101-200 embedded', async () => {
    const response = await client.searchConfirmedTransactions({
      address: 'NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA',
      embedded: true,
      pageSize: 100,
      pageNumber: 2,
    });
    expect(response).toBeDefined();
  });
});

describe('Receipts API', () => {
  const client = new ReceiptRoutesApi(new Configuration({ basePath: 'https://sakia.harvestasya.com:3001' }));

  it('should fetch receipts for a block 1-100', async () => {
    const response = await client.searchReceipts({
      targetAddress: 'NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA',
      pageSize: 100,
      pageNumber: 1,
    });
    expect(response).toBeDefined();
  });

  it('should fetch receipts for a block 101-200', async () => {
    const response = await client.searchReceipts({
      targetAddress: 'NC3XK5WRNQSDZRDBRD6NWL3RHYV5QNLU4WTXODA',
      pageSize: 100,
      pageNumber: 2,
    });
    expect(response).toBeDefined();
  });
});
