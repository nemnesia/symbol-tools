import { describe, expect, it } from 'vitest';

import * as index from '../src/index.js';
import { nemChannelPaths } from '../src/nemChannelPaths.js';

describe('Channel path definitions', () => {
  describe('Nem', () => {
    it('nemChannelPaths: subscribe関数はアドレス付きで正しいパスを生成する / nemChannelPaths: function subscribe produces correct path with address', () => {
      const res =
        typeof nemChannelPaths.account.subscribe === 'function'
          ? nemChannelPaths.account.subscribe('ABC123')
          : nemChannelPaths.account.subscribe;
      expect(res).toBe('/account/ABC123');
    });

    it('nemChannelPaths: accountMosaic およびその他の関数パスは期待される文字列を生成する / nemChannelPaths: accountMosaic and other function paths produce expected strings', () => {
      expect(
        typeof nemChannelPaths.accountMosaic.subscribe === 'function'
          ? nemChannelPaths.accountMosaic.subscribe('ADDR')
          : nemChannelPaths.accountMosaic.subscribe
      ).toBe('/account/mosaic/owned/ADDR');
      expect(
        typeof nemChannelPaths.accountMosaicDef.subscribe === 'function'
          ? nemChannelPaths.accountMosaicDef.subscribe('ADDR')
          : nemChannelPaths.accountMosaicDef.subscribe
      ).toBe('/account/mosaic/owned/definition/ADDR');
      expect(
        typeof nemChannelPaths.accountNamespace.subscribe === 'function'
          ? nemChannelPaths.accountNamespace.subscribe('ADDR')
          : nemChannelPaths.accountNamespace.subscribe
      ).toBe('/account/namespace/owned/ADDR');
      expect(
        typeof nemChannelPaths.unconfirmed.subscribe === 'function'
          ? nemChannelPaths.unconfirmed.subscribe('ADDR')
          : nemChannelPaths.unconfirmed.subscribe
      ).toBe('/unconfirmed/ADDR');
      expect(
        typeof nemChannelPaths.transactions.subscribe === 'function'
          ? nemChannelPaths.transactions.subscribe('ADDR')
          : nemChannelPaths.transactions.subscribe
      ).toBe('/transactions/ADDR');
      expect(
        typeof nemChannelPaths.recenttransactions.subscribe === 'function'
          ? nemChannelPaths.recenttransactions.subscribe('ADDR')
          : nemChannelPaths.recenttransactions.subscribe
      ).toBe('/recenttransactions/ADDR');
    });

    it('nemChannelPaths: 定数のsubscribeパスは正しい / nemChannelPaths: constant subscribe paths are correct', () => {
      expect(nemChannelPaths.newBlock.subscribe).toBe('/blocks/new');
      expect(nemChannelPaths.blocks.subscribe).toBe('/blocks');
    });

    it('indexはモニターと型をエクスポートする / index exports monitors and types', () => {
      expect(index.NemWebSocket).toBeDefined();
    });
  });
});
