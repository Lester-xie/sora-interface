import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LogoIcon } from '../../components/Svg'
import Flex from '../../components/Box/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from './icons'
import MenuButton from './MenuButton'
import { isMobile } from 'react-device-detect'

const MERGE:string = process.env.REACT_APP_MERGE || 'pe'

interface Props {
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
}

const Ttest = styled.span`
  width: 40px;
  height: 22px;
  line-height: 22px;
  background: #e55268;
  text-align: center;
  border-radius: 12px;
  border-bottom-left-radius: 0;
  color: #fff;
  font-size: 14px;
  margin-left: 4px;
  font-weight: 700;
  font-family: SourceHanSans, SourceHanSans-Bold;
  em {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    margin-left: 1px;
  }
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 226px;
    height: 38px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const testServerList = ['t1', 't2', 't3', 't4', 't5']
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
      {testServerList.map((item) =>
        MERGE === item ? (
          <Ttest>
            {item.substr(0, 1).toUpperCase()}
            <em>{item.substr(1)}</em>
          </Ttest>
        ) : (
          ''
        )
      )}
    </>
  )

  return (
    <Flex alignItems="center">
      <MenuButton aria-label="Toggle menu" onClick={togglePush} mr={isMobile? '4px':'24px'}>
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Cherry home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="Cherry home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default Logo
