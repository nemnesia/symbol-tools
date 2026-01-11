/**
 * ページタイトル設定用カスタムフック
 * コンポーネントから呼び出すことで、アプリバーのタイトルを更新できる
 */
import { useEffect } from 'react';

/**
 * ページタイトルを設定
 * @param title - 設定するタイトル文字列
 */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    // カスタムイベントを発火してタイトルを更新
    const event = new CustomEvent('page-title-change', { detail: title });
    window.dispatchEvent(event);
  }, [title]);
};
