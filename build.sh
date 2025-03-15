#!/bin/sh

set -e

node generate.js
cp _headers dist/

cd dist
zip out.zip *