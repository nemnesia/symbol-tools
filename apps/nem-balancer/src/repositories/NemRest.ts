/**
 * NEM REST APIクライアント
 * NEMブロックチェーンのREST APIにアクセスするためのクライアントクラス
 */

/** NEMアカウント情報のインターフェース */
export interface NemAccountInfo {
  meta: {
    cosignatories: [];
    cosignatoryOf: [];
    status: string;
    remoteStatus: string;
  };
  account: {
    address: string; // アドレス
    harvestedBlocks: bigint; // ハーベスト済みブロック数
    balance: number; // 残高
    importance: number; // 重要度
    vestedBalance: number; // 既得権残高
    publicKey: string; // 公開鍵
    label: string | null; // ラベル
    multisigInfo: object; // マルチシグ情報
  };
}

/**
 * NEM REST APIクライアントクラス
 */
export class NemRest {
  private nodeUrl: string;

  /**
   * コンストラクタ
   * @param nodeUrl - NEMノードのURL
   */
  constructor(nodeUrl: string) {
    this.nodeUrl = nodeUrl;
  }

  /**
   * アカウント情報を取得
   * @param address - NEMアドレス
   * @returns アカウント情報
   */
  public async getAccountInfo(address: string): Promise<NemAccountInfo> {
    const response = await fetch(`${this.nodeUrl}/account/get?address=${address}`);
    return await response.json();
  }
}
