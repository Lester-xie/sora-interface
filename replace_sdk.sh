#!/bin/bash
cd node_modules/@pancakeswap-libs/sdk
rm -rf dist
cd -
cp -R ../pancakeswap-sdk/dist node_modules/@pancakeswap-libs/sdk/

# add core contract

cd node_modules/@pancakeswap-libs/
mkdir -p pancake-swap-core/build/
cd -
cp ../pancake-swap-core/build/contracts/* node_modules/@pancakeswap-libs/pancake-swap-core/build/
