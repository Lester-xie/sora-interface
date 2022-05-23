import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from './uikit'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import Providers from './Providers'
import Fingerprint2 from 'fingerprintjs2'
import 'inter-ui'
import './i18n'
import env from './config/env'

// console.log('env', env)

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

Fingerprint2.get(function(components) {
  const values = components.map(function(component,index) {
    if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
      return component.value.replace(/\bNetType\/\w+\b/, '')
    }
    return component.value
  })
  // 生成最终id murmur
  // console.log(values,'Fingerprint2===')  //使用的浏览器信息
  const murmur = Fingerprint2.x64hash128(values.join(''), 31)
  // console.log(murmur,'Fingerprint2----') //生成的标识码

  if (!localStorage.getItem('user')) {
    var timestamp = new Date().getTime()
    localStorage.setItem('user',murmur + timestamp)
  }
})
// console.log(Fingerprint2,'Fingerprint2')

window.addEventListener('error', () => {
   localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  // <StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
      <ResetCSS />
      <GlobalStyle />
      <App />
    </Providers>,
  // </StrictMode>,
  document.getElementById('root')
)
