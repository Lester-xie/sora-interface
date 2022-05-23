import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Currency, ETHER, Token } from '../../sdk'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import CoinLogo from '../cherry/CoinLogo'
import env from '../../config/env'
import getTokenLogoURL from '../../utils/getTokenLogoURL'



const StyledCheLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
                                       currency,
                                       size = '24px',
                                       style
                                     }: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address), `/images/coins/${currency?.address ?? 'token'}.png`]
      }

      return [getTokenLogoURL(currency.address), `/images/coins/${currency?.address ?? 'token'}.png`]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledCheLogo src={getTokenLogoURL(env.wokt)} size={size} style={style} />
  }

  return (currency as any)?.symbol ? (
    <CoinLogo size={size} srcs={srcs} alt={`${currency?.address ?? 'token'} logo`} style={style} />
  ) : (
    <StyledLogo size={size} srcs={srcs} alt={`${currency?.address ?? 'token'} logo`} style={style} />
  )
}
