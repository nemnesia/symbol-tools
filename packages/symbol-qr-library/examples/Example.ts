/**
 * (C) Symbol Contributors 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export abstract class Example {
  /**
   * 例となるインスタンスを構築する
   *  / Construct an example instance
   */
  constructor() {}

  /// region Abstract Methods
  /**
   * `execute()`メソッドは、基盤となる例示のビジネスフローを実行する必要があります。
   *  / The `execute()` method should run the underlying example business flow.
   *
   * @return {number}
   */
  public abstract execute(): Promise<number>;
  /// end-region Abstract Methods

  /**
   * 実行プロミスを解決する。
   *  / Resolve the execution promise.
   *
   * @template T
   * @param {T} resp 実行結果 / The execution result
   * @return {Promise<T>}
   */
  public resolve<T>(resp: T): Promise<T> {
    return new Promise((resolve, _reject) => {
      return resolve(resp);
    });
  }

  /**
   * 実行プロミスを拒否する。
   *  / Reject the execution promise.
   *
   * @template T
   * @param {T} resp 実行結果 / The execution result
   * @return {Promise<T>}
   */
  public reject<T>(resp: T): Promise<T> {
    return new Promise((resolve, reject) => {
      return reject(resp);
    });
  }
}
