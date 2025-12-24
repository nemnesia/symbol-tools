#!/bin/bash

set -ex

cd "$(dirname "$0")/.."

rm -rf ./types ./utils
rm -rf ./src/symbol
mkdir -p ./src/symbol
mkdir -p ./src/utils

cp ./_symbol/sdk/javascript/src/symbol/models.js ./src/symbol
cp ./_symbol/sdk/javascript/src/BaseValue.js ./src
cp ./_symbol/sdk/javascript/src/ByteArray.js ./src
cp ./_symbol/sdk/javascript/src/utils/BufferView.js ./src/utils
cp ./_symbol/sdk/javascript/src/utils/Writer.js ./src/utils
cp ./_symbol/sdk/javascript/src/utils/arrayHelpers.js ./src/utils
cp ./_symbol/sdk/javascript/src/utils/converter.js ./src/utils
cp ./_symbol/sdk/javascript/src/utils/charMapping.js ./src/utils

cp ./_symbol/sdk/javascript/src/symbol/models_ts.js ./src/symbol
cp ./_symbol/sdk/javascript/src/symbol/Network.js ./src/symbol
cp ./_symbol/sdk/javascript/src/CryptoTypes.js ./src

node scripts/generate-index.js

npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/index.js
npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/symbol/index.js
