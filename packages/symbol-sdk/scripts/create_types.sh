#!/bin/bash

set -ex

cd "$(dirname "$0")/.."

rm -rf ./types
mkdir -p ./types

npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/index.js
npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/symbol/index.js
npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/nem/index.js
