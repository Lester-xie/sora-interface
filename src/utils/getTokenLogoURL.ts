import { getAddress } from './addressHelpers'
import env from 'config/env'

export default function getTokenLogoURL(address: string = env.che, type?:string='coins', position?=null) {
  const adr: string = getAddress(address).toLocaleLowerCase() || ''
  let baseUrl = "www.cherryswap.io"
  return `${baseUrl}${type}/${adr}${position ? '-'+position: ''}.png`
}
