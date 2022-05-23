import React from 'react'
import { Button, Text } from '../../uikit'

import { Currency, CurrencyAmount, Fraction, Percent } from '../../sdk'
import { RowBetween, RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../components/Shared'
import useI18n from 'hooks/useI18n'

const { body: Body } = TYPE

export function ConfirmAddModalBottom({
                                        noLiquidity,
                                        price,
                                        currencies,
                                        parsedAmounts,
                                        poolTokenPercentage,
                                        onAdd
                                      }: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const TranslateString = useI18n()

  return (
    <>
      <RowBetween>
        <Body>{currencies[Field.CURRENCY_A]?.symbol} {TranslateString(844, 'Deposited')}</Body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Body>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Body>{currencies[Field.CURRENCY_B]?.symbol} {TranslateString(844, 'Deposited')}</Body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Body>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Body>{TranslateString(846, 'Rates')}</Body>
        <Body>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Body>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween>
        <Body>{TranslateString(848, 'Share of Pool')} </Body>
        <Body>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Body>
      </RowBetween>
      <Button mt='20px' onClick={onAdd}>
        {noLiquidity ? TranslateString(850, 'Create Pool & Supply') : TranslateString(852, 'Confirm Supply')}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
