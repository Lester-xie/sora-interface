import { ChainId } from '../index'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xC775519F53fA460cE29a4EeE414E43D4BFf6cC1D', // TODO
  [ChainId.OKTESTNET]: '0xC775519F53fA460cE29a4EeE414E43D4BFf6cC1D',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
