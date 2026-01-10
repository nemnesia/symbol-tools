# Changelog

## [1.0.1] - 2026-01-08

### Changed

- トランザクション関連DTOの一部プロパティを必須から任意（optional）に変更
  - AccountMosaicRestrictionTransactionDTO: restrictionAdditions, restrictionDeletions
  - AccountOperationRestrictionTransactionBodyDTO: restrictionAdditions, restrictionDeletions
  - AggregateTransactionBodyDTO: cosignatures
  - TransactionHashes: hashes
  - NamespaceRegistrationTransactionDTO: duration, parentId
  - その他、関連する型のoptional化
  - 詳細は型定義を参照してください
- ブロックの検索APIにfromTimestampとtoTimestampを追加

## [1.0.0] - 初版リリース
