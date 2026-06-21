import { describe, expect, it } from 'vitest';

import * as sdk from '../src/index.js';
import * as nem from '../src/nem/index.js';
import * as symbol from '../src/symbol/index.js';

describe('index exportsのテスト', () => {
  it('root indexが期待するシンボルを公開している', () => {
    expect(sdk.BaseValue).toBeDefined();
    expect(sdk.ByteArray).toBeDefined();
    expect(sdk.Bip32).toBeDefined();
    expect(sdk.NetworkLocator).toBeDefined();
    expect(sdk.utils).toBeDefined();
    expect(typeof sdk.utils.deepCompare).toBe('function');
  });

  it('nem indexが期待するシンボルを公開している', () => {
    expect(nem.NemFacade).toBeDefined();
    expect(nem.Network).toBeDefined();
    expect(nem.TransactionFactory).toBeDefined();
    expect(nem.calculateMosaicRentalFee).toBeDefined();
    expect(nem.calculateNamespaceRentalFee).toBeDefined();
    expect(nem.calculateTransactionFee).toBeDefined();
    expect(nem.models).toBeDefined();
    expect(nem.descriptors).toBeDefined();
  });

  it('symbol indexが期待するシンボルを公開している', () => {
    expect(symbol.SymbolFacade).toBeDefined();
    expect(symbol.Network).toBeDefined();
    expect(symbol.SymbolTransactionFactory).toBeDefined();
    expect(symbol.calculateTransactionFee).toBeDefined();
    expect(symbol.generateNamespaceId).toBeDefined();
    expect(symbol.proveMerkle).toBeDefined();
    expect(symbol.models).toBeDefined();
    expect(symbol.descriptors).toBeDefined();
  });
});
