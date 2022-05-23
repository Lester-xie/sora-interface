import env, { MERGE } from '../../config/env'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
export default {
  "name": "cherryswap",
  "timestamp": "2020-08-25T15:41:29.665Z",
  "version": {
    "major": 1,
    "minor": 3,
    "patch": 1
  },
  "tags": {},
  "logoURI": getTokenLogoURL(env.wokt),
  "keywords": ["cherry", "default"],
  "tokens": [
    {
      "name": "TUSDT",
      "symbol": "TUSDT",
      "address": env.tusdt,
      "chainId": 65,
      "decimals": 18,
      "logoURI": getTokenLogoURL(env.tusdt)
    },
    {
      "name": "TUSDC",
      "symbol": "TUSDC",
      "address":env.tusdc,
      "chainId": 65,
      "decimals": 18,
      "logoURI": getTokenLogoURL(env.tusdc)
    },
  ]
}
