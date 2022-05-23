import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Text } from '../../uikit'
import { useUserDeadline } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'
import TranslatedText from '../TranslatedText'
import useI18n from 'hooks/useI18n'

const StyledTransactionDeadlineSetting = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }

  & > ${Text} {
    font-size: 14px;
    margin-left: 8px;
  }
`

const MinutesInput = styled(Input)`
  width: 108px;
  height: 48px;
  opacity: 1;
  background: #f1f1f1;
  border-radius: 15px;
`

const MinutesText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #25030a;
`

const TransactionDeadlineSetting = () => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)
  const TranslateString = useI18n()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError('Enter a valid deadline')
      }
    } catch {
      setError('Enter a valid deadline')
    }
  }, [value, setError, setDeadline])

  return (
    <StyledTransactionDeadlineSetting>
      <Label>
        <Text style={{ fontWeight: 600 }}>
          <TranslatedText translationId={746}>Transaction deadline</TranslatedText>
        </Text>
        <QuestionHelper text={TranslateString(786, 'Your transaction will revert if it is pending for more than this long.')} />
      </Label>
      <Field>
        <MinutesInput type="number" step="1" min="1" value={value} onChange={handleChange} />
        <MinutesText><TranslatedText translationId={748}>Minutes</TranslatedText></MinutesText>
      </Field>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
    </StyledTransactionDeadlineSetting>
  )
}

export default TransactionDeadlineSetting
