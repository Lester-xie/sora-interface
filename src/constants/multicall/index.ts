import { ChainId } from '../index'
import MULTICALL_ABI from './WADA_abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xb7b51Abbeb753A5c5314c4C2f9104370fCf60995', // TODO
  [ChainId.OKTESTNET]: '0xb7b51Abbeb753A5c5314c4C2f9104370fCf60995',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }

