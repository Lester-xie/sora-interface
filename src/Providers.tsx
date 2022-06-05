import React from 'react'
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { Provider } from 'react-redux'
import store from './state'
import { ThemeContextProvider } from './ThemeContext'
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask'
import {MetaMask} from "@web3-react/metamask";

const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks]
]

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Provider store={store}>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
