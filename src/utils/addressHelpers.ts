export const getAddress = (address: any): string => {
  const mainNetChainId = 65
  const chainId = process.env.REACT_APP_CHAIN_ID
  if ((typeof address).toLocaleLowerCase() === 'string')return address;
  return address[chainId||mainNetChainId]
}
