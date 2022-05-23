import React from 'react'
import { Card, CardBody, Text } from '../../uikit'

import { Trade, TradeType } from '../../sdk'
import { Field } from '../../state/swap/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { SectionBreak } from './styleds'
import SwapRoute from './SwapRoute'
import TranslatedText from '../TranslatedText'
import useI18n from 'hooks/useI18n'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const TranslateString = useI18n()

  return (
    <Card>
      <CardBody>
        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">{isExactIn ?<TranslatedText translationId={954}>Minimum received</TranslatedText> : <TranslatedText translationId={820}>Maximum sold</TranslatedText>}</Text>
            <QuestionHelper text={TranslateString(802, 'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.')} />
          </RowFixed>
          <RowFixed>
            <Text fontSize="14px">
              {isExactIn
                ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                  '-'
                : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                  '-'}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="14px"><TranslatedText translationId={826}>Price Impact</TranslatedText></Text>
            <QuestionHelper text={TranslateString(824,'The difference between the market price and estimated price due to trade size')} />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize="14px"><TranslatedText translationId={828}>Liquidity Provider Fee</TranslatedText></Text>
            <QuestionHelper text={TranslateString(1428, 'For each trade a 0.3% fee is paid. 0.25% goes to liquidity providers and 0.05% goes to the CherrySwap treasury.',{num1: '0.3%',num2:'0.25%',num3: '0.05%'})} />
          </RowFixed>
          <Text fontSize="14px">
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </CardBody>
    </Card>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="md">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <SectionBreak />
              <AutoColumn style={{ padding: '0 24px' }}>
                <RowFixed>
                  <Text fontSize="14px">Route</Text>
                  <QuestionHelper text="Routing through these tokens resulted in the best price for your trade." />
                </RowFixed>
                <SwapRoute trade={trade} />
              </AutoColumn>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
