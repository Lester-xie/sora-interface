import React from 'react'
import { SvgProps } from '../../components/Svg'
import Text from '../../components/Text/Text'
import Dropdown from '../../components/Dropdown/Dropdown'
import Button from '../../components/Button/Button'
import * as IconModule from './icons'
import { LangType } from './types'
import MenuButton from './MenuButton'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }
const { LanguageIcon } = Icons

interface Props {
  currentLang: string;
  langs: LangType[];
  setLang: (lang: LangType) => void;
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang }) => (
  <Dropdown
    position='bottom'
    target={
      <Button variant='text' style={{backgroundColor: 'rgba(229,82,104,0.08)', height: '40px',borderRadius: '20px',marginRight: isMobile?'10px':'24px',padding: isMobile?'0 18px':'0 24px'}} startIcon={<LanguageIcon color='textSubtle' width='24px' marginRight="6px"/>}>
        <Text color='textSubtle' ml="6px">{currentLang}</Text>
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.code}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: '40px', height: 'auto' }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
)

const LangBtn = styled(Button)`
  //width: 130px;
  height: 40px;
  opacity: 0.08;
  background: #e55268;
  border-radius: 20px;
`

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
