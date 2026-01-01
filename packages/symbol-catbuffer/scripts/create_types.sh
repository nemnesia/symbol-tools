#!/bin/bash

set -ex

cd "$(dirname "$0")/.."

npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/index.js
npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ./types ./src/symbol/index.js
