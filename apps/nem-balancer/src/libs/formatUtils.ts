/**
 * 数値フォーマットユーティリティ
 * 数値の表示フォーマット処理を提供
 */

/**
 * 数値をカンマ区切り形式にフォーマット（小数点以下6桁まで表示）
 * @param value - フォーマットする文字列値
 * @returns カンマ区切りでフォーマットされた文字列
 */
export function formatNumber(value: string): string {
  if (value === '' || isNaN(Number(value))) return value;
  const num = Number(value);
  return num.toLocaleString(undefined, {
    minimumFractionDigits: value.includes('.') ? Math.min(6, value.split('.')[1]?.length || 0) : 0,
    maximumFractionDigits: 6,
  });
}

/**
 * フォーマットされた数値文字列からカンマを除去
 * @param value - カンマを含む文字列
 * @returns カンマが除去された文字列
 */
export function unformatNumber(value: string): string {
  return value.replace(/,/g, '');
}

/**
 * 小数第6位で切り捨て（NEMの精度に対応）
 * @param value - 切り捨てする数値
 * @returns 小数第6位で切り捨てられた数値
 */
export function roundToSixDecimals(value: number): number {
  return Math.floor(value * 1_000_000) / 1_000_000;
}
