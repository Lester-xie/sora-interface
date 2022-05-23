import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from '../../uikit'
import { ArrowUpCircle } from 'react-feather'

import { ChainId } from '../../constants'
import { AutoColumn } from '../Column'
import { getOkLinkLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

import tc_success from '../../assets/images/tc_success@2x.png'
import TranslatedText from '../TranslatedText'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon>
          {/* <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} /> */}
          <img src={tc_success} alt=""/>
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal href={getOkLinkLink(chainId, hash, 'transaction')}><TranslatedText translationId={772}>View on Oklink</TranslatedText></LinkExternal>
          )}
          <Button onClick={onDismiss} mt="20px">
            <TranslatedText translationId={1250}>Close</TranslatedText>
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
