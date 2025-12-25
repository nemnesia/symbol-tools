import {
  Configuration,
  HeightInfo,
  NEMNodesApi,
  SymbolNodesApi,
} from '@nemnesia/nodewatch-openapi-typescript-fetch-client';

/** NodeWatch メインネット用URLリスト */
export const nodewatchMainnetUrls = ['https://sse.nemnesia.com', 'https://sse2.nemnesia.com'];
/** NodeWatch テストネット用URLリスト */
export const nodewatchTestnetUrls = ['https://testnet.sse.nemnesia.com', 'https://testnet.sse2.nemnesia.com'];

/** チェーン名の型定義 */
type ChainName = 'nem' | 'symbol';
/** ネットワークの型定義 */
type Network = 'mainnet' | 'testnet';
/** ピッカーオプションのインターフェース */
interface PickerOptions {
  chainName?: ChainName;
  network?: Network;
  count?: number;
  isSsl?: boolean;
  timeoutMs?: number;
}

/** ノードエントリのインターフェース */
interface NodeEntry {
  height: number;
  endpoint: string;
  isSslEnabled: boolean | null;
}

/** キャッシュエントリのインターフェース */
interface CacheEntry {
  heightInfo: HeightInfo;
  nodes: NodeEntry[];
  timestamp: number;
  baseUrl: string;
}

export const symbolCache = new Map<string, CacheEntry>(); // Symbolノード用キャッシュ
export const nemCache = new Map<string, CacheEntry>(); // NEMノード用キャッシュ

// 設定値
const CACHE_DURATION = 60000; // 1分間キャッシュ

/**
 * タイムアウト機能付きのリクエスト関数（クリーンアップ対応）
 * @param promise リクエストのPromise
 * @param timeoutMs timeout時間（ミリ秒）
 */
async function _fetchWithTimeout(promise: Promise<any>, timeoutMs: number): Promise<any> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId); // タイムアウトをクリア
    return result;
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId); // エラー時もタイムアウトをクリア
    throw error;
  }
}

/**
 * Symbolノードを取得する
 * @param network ネットワーク[mainnet|testnet]
 * @param count 取得するノード数
 * @param isSsl SSLのみ取得するか
 * @param timeoutMs タイムアウト時間（ミリ秒）
 * @returns ノードのエンドポイント配列
 */
async function _symbolNodePicker(
  network: 'mainnet' | 'testnet',
  count: number,
  isSsl: boolean,
  timeoutMs: number
): Promise<string[]> {
  // キャッシュチェック
  const cacheKey = `${network}_${isSsl}`;
  const cachedEntry = symbolCache.get(cacheKey);

  let heightInfo: HeightInfo;
  let nodes: any[];

  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
    // キャッシュからデータを使用
    ({ heightInfo, nodes } = cachedEntry);
  } else {
    // NodeWatchに接続して高さ情報とノード一覧を並列取得
    const nodewatchUrls = network === 'mainnet' ? nodewatchMainnetUrls : nodewatchTestnetUrls;

    // 全てのNodeWatchを並列で試行（最初に成功したものを使用）
    const nodeWatchPromises = nodewatchUrls.map(async (baseUrl) => {
      const openApi = new SymbolNodesApi(new Configuration({ basePath: baseUrl }));

      try {
        // 高さ情報とノード一覧を並列取得（タイムアウト付き）
        const [heightInfo, nodes] = await Promise.all([
          _fetchWithTimeout(openApi.getSymbolHeight(), timeoutMs),
          _fetchWithTimeout(openApi.getSymbolPeerNodes(), timeoutMs),
        ]);

        return { heightInfo, nodes, baseUrl };
      } catch (error) {
        throw new Error(`Failed to connect to ${baseUrl}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    // 最初に成功したNodeWatchの結果を使用
    let successfulResult: { heightInfo: HeightInfo; nodes: NodeEntry[]; baseUrl: string } | null = null;

    try {
      successfulResult = await Promise.any(nodeWatchPromises);
    } catch {
      throw new Error('No available NodeWatch found.');
    }

    ({ heightInfo, nodes } = successfulResult);

    // キャッシュに保存
    symbolCache.set(cacheKey, {
      heightInfo,
      nodes,
      timestamp: Date.now(),
      baseUrl: successfulResult.baseUrl,
    });
  }
  // フィルタリング
  let filteredNodes = nodes.filter((node) => node.height >= heightInfo!.height);

  if (isSsl) {
    filteredNodes = filteredNodes.filter((node) => node.isSslEnabled === true);
  }
  // ランダムに取得する
  const randomNodes = filteredNodes.sort(() => 0.5 - Math.random()).slice(0, count);

  return randomNodes.map((node) => node.endpoint);
}

/**
 * NEMノードを取得する
 * @param network ネットワーク[mainnet|testnet]
 * @param count 取得するノード数
 * @param isSsl SSLのみ取得するか
 * @param timeoutMs タイムアウト時間（ミリ秒）
 * @returns ノードのエンドポイント配列
 */
async function _nemNodePicker(
  network: 'mainnet' | 'testnet',
  count: number,
  isSsl: boolean,
  timeoutMs: number
): Promise<string[]> {
  // キャッシュチェック
  const cacheKey = `${network}_${isSsl}`;
  const cachedEntry = nemCache.get(cacheKey);

  let heightInfo: HeightInfo;
  let nodes: any[];

  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
    // キャッシュからデータを使用
    ({ heightInfo, nodes } = cachedEntry);
  } else {
    // NodeWatchに接続して高さ情報とノード一覧を並列取得
    const nodewatchUrls = network === 'mainnet' ? nodewatchMainnetUrls : nodewatchTestnetUrls;

    // 全てのNodeWatchを並列で試行（最初に成功したものを使用）
    const nodeWatchPromises = nodewatchUrls.map(async (baseUrl) => {
      const openApi = new NEMNodesApi(new Configuration({ basePath: baseUrl }));

      try {
        // 高さ情報とノード一覧を並列取得（タイムアウト付き）
        const [heightInfo, nodes] = await Promise.all([
          _fetchWithTimeout(openApi.getNemHeight(), timeoutMs),
          _fetchWithTimeout(openApi.getNemNodes(), timeoutMs),
        ]);

        return { heightInfo, nodes, baseUrl };
      } catch (error) {
        throw new Error(`Failed to connect to ${baseUrl}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    // 最初に成功したNodeWatchの結果を使用
    let successfulResult: { heightInfo: HeightInfo; nodes: NodeEntry[]; baseUrl: string } | null = null;

    try {
      successfulResult = await Promise.any(nodeWatchPromises);
    } catch {
      throw new Error('No available NodeWatch found.');
    }

    ({ heightInfo, nodes } = successfulResult);

    // キャッシュに保存
    nemCache.set(cacheKey, {
      heightInfo,
      nodes,
      timestamp: Date.now(),
      baseUrl: successfulResult.baseUrl,
    });
  }
  // フィルタリング
  let filteredNodes = nodes.filter((node) => node.height >= heightInfo!.height);

  if (isSsl) {
    filteredNodes = filteredNodes.filter((node) => node.isSslEnabled === true);
  }
  // ランダムに取得する
  const randomNodes = filteredNodes.sort(() => 0.5 - Math.random()).slice(0, count);

  return randomNodes.map((node) => node.endpoint);
}

/**
 * NEM/Symbolノードを取得する
 * @param chainName チェーン名[nem|symbol] - default: symbol
 * @param network ネットワーク[mainnet|testnet] - default: mainnet
 * @param count 取得するノード数 - default: 1
 * @param isSsl SSLのみ取得するか - default: false
 * @param timeoutMs タイムアウト時間（ミリ秒） - default: 3000
 * @returns ノードのエンドポイント配列
 */
export async function nemSymbolNodePicker({
  chainName = 'symbol',
  network = 'mainnet',
  count = 1,
  isSsl = false,
  timeoutMs = 3000,
}: PickerOptions = {}): Promise<string[]> {
  // バリデーション: chainName
  const validChainNames = ['nem', 'symbol'];
  if (!validChainNames.includes(chainName)) {
    throw new Error(`Invalid chainName: ${chainName}. Must be 'nem' or 'symbol'.`);
  }
  // バリデーション: network
  const validNetworks = ['mainnet', 'testnet'];
  if (!validNetworks.includes(network)) {
    throw new Error(`Invalid network: ${network}. Must be 'mainnet' or 'testnet'.`);
  }
  // バリデーション: countは正の整数である必要がある
  if (typeof count !== 'number' || count <= 0 || !Number.isInteger(count)) {
    throw new Error('Count must be a positive integer');
  }
  // バリデーション: isSslはboolean
  if (typeof isSsl !== 'boolean') {
    throw new Error('isSsl must be a boolean');
  }
  // バリデーション: timeoutMsは正の整数
  if (typeof timeoutMs !== 'number' || timeoutMs <= 0 || !Number.isInteger(timeoutMs)) {
    throw new Error('timeoutMs must be a positive integer (ms)');
  }

  let result: string[];

  if (chainName === 'symbol') {
    result = await _symbolNodePicker(network, count, isSsl, timeoutMs);
  } else {
    result = await _nemNodePicker(network, count, isSsl, timeoutMs);
  }

  return result;
}
