import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '../../uikit'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  // tede切换按钮位置
  <StyledNav>
    {/*variant: 按钮主题色*/}
    <ButtonMenu activeIndex={activeIndex} size="md" variant="subtle">

      <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
        <TranslatedText translationId={688}>Exchange</TranslatedText>
      </ButtonMenuItem>

      <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
        <TranslatedText translationId={862}>Liquidity</TranslatedText>
      </ButtonMenuItem>

      {/*<ButtonMenuItem*/}
      {/*  id="pool-nav-link"*/}
      {/*  as="a"*/}
      {/*  href="https://www.cherry.org/en/bridge?utm_source=CherrySwap"*/}
      {/*  target="_blank"*/}
      {/*  rel="noreferrer noopener"*/}
      {/*>*/}
      {/*  Bridge*/}
      {/*</ButtonMenuItem>*/}
    </ButtonMenu>
  </StyledNav>
)

export default Nav
