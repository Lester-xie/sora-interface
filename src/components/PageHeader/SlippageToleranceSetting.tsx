import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Flex, Input, Text } from '../../uikit'
import { useUserSlippageTolerance } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'
import TranslatedText from '../TranslatedText'
import { isMobile } from 'react-device-detect'
import useI18n from 'hooks/useI18n'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const StyledSlippageToleranceSettings = styled.div`
  margin-bottom: 16px;
`

const Option = styled.div`
  padding: 0 4px;
`

const Rote = styled.div`
  padding: 0 4px;
  position: relative;
  right: ${() => (isMobile ? '-10px' : 0)};
`


const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  ${Option}:first-child {
    padding-left: 0;
  }

  ${Option}:last-child {
    padding-right: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: flex-start;
  }
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`


const RotiBtn = styled(Button)`
  width: 88px;
  height: 48px;
  background: #f3dde0;
  border-radius: 15px;
  font-size: 20px;
  text-align: center;
  color: #e55268;
`

const predefinedValues = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1%', value: 1 }
]

const SlippageToleranceSettings = () => {
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [value, setValue] = useState(userSlippageTolerance / 100)
  const [error, setError] = useState<string | null>(null)
  const TranslateString = useI18n()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseFloat(inputValue))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 100
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError(TranslateString(894, 'Enter a valid slippage percentage'))
      }
    } catch {
      setError(TranslateString(894, 'Enter a valid slippage percentage'))
    }
  }, [value, setError, setUserslippageTolerance, TranslateString])

  // Notify user if slippage is risky
  useEffect(() => {
    if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError(TranslateString(896, 'Your transaction may fail'))
    } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError('Your transaction may be frontrun')
    }
  }, [userSlippageTolerance, setError, TranslateString])

  return (
    <StyledSlippageToleranceSettings>
      <Label>
        <Text style={{ fontWeight: 600 }}>
          {TranslateString(744, 'Slippage tolerance')}
        </Text>
        <QuestionHelper
          text={TranslateString(784,'Your transaction will revert if the price changes unfavorably by more than this percentage.')}/>
      </Label>
      <Options>
        <Flex mb={['8px', '12px']} mr={[0, '8px']}>
          {predefinedValues.map(({ label, value: predefinedValue }) => {
            const handleClick = () => setValue(predefinedValue)

            return (
              <Option key={predefinedValue}>
                <RotiBtn variant={value === predefinedValue ? 'primary' : 'tertiary'} onClick={handleClick}>
                  {label}
                </RotiBtn>
              </Option>
            )
          })}
        </Flex>
        <Flex alignItems='center'>
          <Option>
            <Input
              style={{ width: isMobile ? '106%' : '100%' }}
              type='number'
              scale='lg'
              step={0.1}
              min={0.1}
              placeholder='5%'
              value={value}
              onChange={handleChange}
              isWarning={error !== null}
            />
          </Option>
          <Rote>
            <Text fontSize='18px'>%</Text>
          </Rote>
        </Flex>
      </Options>
      {error && (
        <Text mt='8px' color='failure'>
          {error}
        </Text>
      )}
    </StyledSlippageToleranceSettings>
  )
}

export default SlippageToleranceSettings
