import React, { useMemo } from 'react'
import { CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Text, Button,Modal } from 'uikit'
import { useActiveWeb3React } from 'hooks'
import { getOkLinkLink } from 'utils'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import Loader from 'components/Loader'
import TranslatedText from '../TranslatedText'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'

type RecentTransactionsModalProps = {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color='success' />, color: 'success' }
  }

  return { icon: <ErrorIcon color='failure' />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss }: RecentTransactionsModalProps) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()
  const TranslateString = useI18n()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  return (
    <Modal title={TranslateString(946, 'Recent Transactions')} onDismiss={onDismiss}>
      {!account && (
        <Flex justifyContent='center' flexDirection='column' alignItems='center'>
          <Text mb='8px' bold>
            {TranslateString(1424, 'Please connect your wallet to view your recent transactions')}
          </Text>
          <Button variant='tertiary' size='sm' onClick={onDismiss}>
            {TranslateString(1250, 'Close')}
          </Button>
        </Flex>
      )}
      {account && chainId && sortedRecentTransactions.length === 0 && (
        <Flex justifyContent='center' flexDirection='column' alignItems='center'>
          <Text mb='8px' bold>
            <TranslatedText translationId={1274}>No recent transactions</TranslatedText>
          </Text>
          <CloseBtn variant='tertiary' size='sm' onClick={onDismiss}>
            <TranslatedText translationId={1250}>Close</TranslatedText>
          </CloseBtn>
        </Flex>
      )}
      {account && chainId && sortedRecentTransactions.map((sortedRecentTransaction) => {
        const { hash, summary } = sortedRecentTransaction
        const { icon, color } = getRowStatus(sortedRecentTransaction)

        return (
          <>
            <Flex key={hash} alignItems='center' justifyContent='space-between' mb='4px'>
              <LinkExternal href={getOkLinkLink(chainId, hash, 'transaction')} color={color}>
                {summary ?? hash}
              </LinkExternal>
              {icon}
            </Flex>
          </>
        )
      })}
    </Modal>
  )
}

const CloseBtn = styled(Button)`
  width: 138px;
  height: 48px;
  background: rgba(229,82,104,0.1);
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #e55268;
  margin-top: 16px;
`

export default RecentTransactionsModal
