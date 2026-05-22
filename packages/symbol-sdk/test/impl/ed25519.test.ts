import { describe, expect, it } from 'vitest';

import ed25519 from '../../src/impl/ed25519.js';

describe('impl/ed25519のテスト', () => {
  it('get()は実装を返す', () => {
    const impl = ed25519.get();
    expect(impl).toBeDefined();
    expect(typeof impl.keyPairFromSeed).toBe('function');
  });

  it('unload()後もget()で再取得できる', () => {
    ed25519.get();
    ed25519.unload();

    const impl = ed25519.get();
    expect(impl).toBeDefined();
  });
});
