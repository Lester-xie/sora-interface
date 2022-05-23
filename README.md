# 🥞 Cherry Swap Exchange

[![Netlify Status](https://api.netlify.com/api/v1/badges/c6ef7e73-4a84-410d-83b0-b89326787dff/deploy-status)](https://app.netlify.com/sites/swap-master/deploys)

[CherrySwap](http://cherryswap.net/) is an automated market maker (“**AMM**”) that allows two tokens to be exchanged on the [Cherry Smart Chain](https://www.Cherry.org/en/smartChain) (BSC). It is fast, cheap, and allows anyone to participate.

This repo is responsible for the **exchange** interface of the AMM: [exchange.cherryswap.finance](https://exchange.cherryswap.finance/)

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.
If you want to list a token, refers to the [listing guidelines](./listing.md).


启动步骤:
1.安装yarn
如果出现
There are no scenarios; must have at least one
则:
sudo apt remove cmdtest
sudo apt remove yarn
 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
 
sudo apt update
sudo apt install yarn

2. 启动命令
npm run dev:t1
