import React from 'react'
import styled from 'styled-components'
import { CherryRoundIcon, CogIcon, SvgProps } from '../../components/Svg'
import Text from '../../components/Text/Text'
import Flex from '../../components/Box/Flex'
import Dropdown from '../../components/Dropdown/Dropdown'
import Link from '../../components/Link/Link'
import Skeleton from '../../components/Skeleton/Skeleton'
import Button from '../../components/Button/Button'
import IconButton from '../../components/Button/IconButton'
import MenuButton from './MenuButton'
import * as IconModule from './icons'
import { socials, MENU_ENTRY_HEIGHT } from './config'
import { PanelProps, PushedProps } from './types'
import ChePrice from './ChePrice'
import { useAddPopup, useBlockNumber } from 'state/application/hooks'
import useI18n from 'hooks/useI18n'
import env, { MERGE } from 'config/env'
import useGetCherryPrice from 'hooks/useGetCherryPrice'
import useGetPriceData from '../../../hooks/useGetPriceData'

interface Props extends PanelProps, PushedProps {
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }
const { MoonIcon, SunIcon, LanguageIcon, PdfIcon } = Icons

const Container = styled.div`
  flex: none;
  padding: 6px 12px 16px 12px;
  background-color: ${({ theme }) => theme.nav.background};
  border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const PriceLink = styled.a`
  display: flex;
  align-items: center;

  svg {
    transition: transform 0.3s;
  }

  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`

const InfoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
  color: #555;
`

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 3px;
`


const BolockHeight = styled.div`
  width: 100%;
  //max-width: 212px;
  height: 32px;
  background: #f9f7f8;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #25030a;
  line-height: 32px;
  text-align: center;
`

const PanelFooter: React.FC<Props> = ({
                                        isPushed,
                                        pushNav,
                                        toggleTheme,
                                        isDark,
                                        currentLang,
                                        langs,
                                        setLang
                                      }) => {

  const currentBlock = useBlockNumber()
  const TranslateString = useI18n()

  const chePrice = useGetCherryPrice()


  console.log('ChePrice111 ??????????????', chePrice)


  // const chePrice = async ()=>{
  //   const response = await fetch('http://t1.cherryswap.net/api/price')
  //   const data = await response.json()
  //
  //   const prices = Object.keys(data.data).reduce((accum, token) => {
  //       return {
  //         ...accum,
  //         [token.toLowerCase()]: data.data[token].price,
  //       }
  //     }, {})
  //   return prices[env.che.toLocaleLowerCase()]
  // }


  if (!isPushed) {
    return (
      <Container>
        <IconButton variant='text' onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    )
  }

  return (
    <Container>


      <SocialEntry>
      <ChePrice chePriceUsd={Number(chePrice)} />
      {/*<SocialLinks />*/}
      </SocialEntry>
      {/*<SettingsEntry>*/}
      {/*  <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />*/}
      {/*  <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />*/}
      {/*</SettingsEntry>*/}

      <BolockHeight>{TranslateString(1420, 'Block Height')}：{currentBlock}</BolockHeight>


      {/*<SocialEntry>*/}
      {/*  {cakePriceUsd ? (*/}
      {/*    <PriceLink href="https://cherryswap.net/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" target="_blank">*/}
      {/*      <CherryRoundIcon width="24px" mr="8px" />*/}
      {/*      <Text color="textSubtle" bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>*/}
      {/*    </PriceLink>*/}
      {/*  ) : (*/}
      {/*    <Skeleton width={80} height={24} />*/}
      {/*  )}*/}
      {/*  <Flex>*/}
      {/*    {socials.map((social, index) => {*/}
      {/*      const Icon = Icons[social.icon];*/}
      {/*      const iconProps = { width: "24px", color: "textSubtle", style: { cursor: "pointer" } };*/}
      {/*      const mr = index < socials.length - 1 ? "24px" : 0;*/}
      {/*      if (social.items) {*/}
      {/*        return (*/}
      {/*          <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>*/}
      {/*            {social.items.map((item) => (*/}
      {/*              <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">*/}
      {/*                {item.label}*/}
      {/*              </Link>*/}
      {/*            ))}*/}
      {/*          </Dropdown>*/}
      {/*        );*/}
      {/*      }*/}
      {/*      return (*/}
      {/*        <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>*/}
      {/*          <Icon {...iconProps} />*/}
      {/*        </Link>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Flex>*/}
      {/*</SocialEntry>*/}
      {/*<SettingsEntry>*/}
      {/*<Button variant="text" onClick={() => toggleTheme(!isDark)}>*/}
      {/*  /!* alignItems center is a Safari fix *!/*/}
      {/*  <Flex alignItems="center">*/}
      {/*    <SunIcon color={isDark ? "textDisabled" : "text"} width="24px" />*/}
      {/*    <Text color="textDisabled" mx="4px">*/}
      {/*      /*/}
      {/*    </Text>*/}
      {/*    <MoonIcon color={isDark ? "text" : "textDisabled"} width="24px" />*/}
      {/*  </Flex>*/}
      {/*</Button>*/}

      {/*<Button variant='text'>*/}
      {/*  /!* alignItems center is a Safari fix *!/*/}
      {/*  <Flex alignItems='center'>*/}
      {/*    <PdfIcon color='#555' width='24px' />*/}
      {/*    /!*<Text color="textDisabled" mx="4px" style={{color: '#555'}}>*!/*/}
      {/*    /!*  Info*!/*/}
      {/*    /!*</Text>*!/*/}
      {/*    <InfoLink href='./cherryswap.pdf' target='_blank'>Info</InfoLink>*/}
      {/*  </Flex>*/}
      {/*</Button>*/}

      {/*<InfoLink href='./cherryswap.pdf' target="_blank">Info</InfoLink>*/}


      {/*<Dropdown*/}
      {/*  position='top'*/}
      {/*  target={*/}
      {/*    <Button variant='text' startIcon={<LanguageIcon color='textSubtle' width='24px' />}>*/}
      {/*      <Text color='textSubtle'>{currentLang?.toUpperCase()}</Text>*/}
      {/*    </Button>*/}
      {/*  }*/}
      {/*>*/}
      {/*  {langs.map((lang) => (*/}
      {/*    <MenuButton*/}
      {/*      key={lang.code}*/}
      {/*      fullWidth*/}
      {/*      onClick={() => setLang(lang)}*/}
      {/*      // Safari fix*/}
      {/*      style={{ minHeight: '32px', height: 'auto' }}*/}
      {/*    >*/}
      {/*      {lang.language}*/}
      {/*    </MenuButton>*/}
      {/*  ))}*/}
      {/*</Dropdown>*/}
      {/*</SettingsEntry>*/}
    </Container>
  )
}

export default PanelFooter
