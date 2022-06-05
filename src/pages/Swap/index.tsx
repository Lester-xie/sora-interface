import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowDown } from 'react-feather'
import { CardBody, ArrowDownIcon, Button, IconButton, Text } from '../../uikit'
import styled ,{ ThemeContext } from 'styled-components'

import { CurrencyAmount, JSBI, Token, Trade } from '../../sdk'
import AddressInputPanel from 'components/AddressInputPanel'
import Card, { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ConfirmSwapModal from 'components/swap/ConfirmSwapModal'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import CardNav from 'components/CardNav'
import { AutoRow, RowBetween } from 'components/Row'
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import BetterTradeLink from 'components/swap/BetterTradeLink'
import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import TradePrice from 'components/swap/TradePrice'
import TokenWarningModal from 'components/TokenWarningModal'
import SyrupWarningModal from 'components/SyrupWarningModal'
import ProgressSteps from 'components/ProgressSteps'

import { BETTER_TRADE_LINK_THRESHOLD, INITIAL_ALLOWED_SLIPPAGE } from 'constants/index'
import { isTradeBetter } from 'data/V1'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useToggledVersion, { Version } from 'hooks/useToggledVersion'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { LinkStyledButton, TYPE } from 'components/Shared'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import Loader from 'components/Loader'
import { TranslateString } from 'utils/translateTextHelpers'
import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import AppBody from '../AppBody'
import TranslatedText from 'components/TranslatedText'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {to,from,priKey,abi} from "data/config"
import Tx from "ethereumjs-tx"
import { ToastContainer } from '../../uikit'
import { alertVariants } from "../../uikit/components/Alert"
import { sample } from "lodash";
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import env from '../../config/env'
import useI18n from 'hooks/useI18n'

const { main: Main } = TYPE


const PageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
  
`


// 领取空投样式
const Receive = styled.a`
  max-width: 460px;
  width: 100%;
  height: 98px;
  opacity: 1;
  background: #ffffff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 30px;
  box-shadow: 0px 2px 30px 0px rgba(232,217,219,0.51);
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  > div {
    font-size: 20px;
    text-align: left;
    color: #000000;
    margin-right: auto;
  }
  .subTips {
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: #8e8f99;
    line-height: 19px;
    text-shadow: 0px 2px 30px 0px rgba(232,217,219,0.51);
    margin-top: 7px;
  }
`

const ReceiveFlex = styled.div`
 display: flex;
 flex: 1 1 auto;
  align-items: center;
`


const Swap = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()
  const [toasts, setToasts] = useState([]);
  const { account } = useActiveWeb3React()
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_NETWORK_URL))
  const myContract = new web3.eth.Contract(abi, to)
  const contractMethods = myContract.methods;
  const [isShowAirdrop, setIsShowAirdrop] = useState(false)
  const [isFirst, setIsFirst] = useState(true)
  const TranslateString = useI18n()

  useEffect(()=>{
    if(account && isFirst){
      contractMethods.setDisplay(account).call().then(data=>{
        setIsShowAirdrop(!data)
      })
      setIsFirst(false)
    }
  },[account,setIsShowAirdrop,contractMethods,isFirst])

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [isSyrup, setIsSyrup] = useState<boolean>(false)
  const [syrupTransactionType, setSyrupTransactionType] = useState<string>('')
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const handleSetIsShowAirdrop = useCallback(() => {
    setIsShowAirdrop(false)
  }, [])

  const handleConfirmSyrupWarning = useCallback(() => {
    setIsSyrup(false)
    setSyrupTransactionType('')
  }, [])

  const theme = useContext(ThemeContext)

  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    v1Trade,
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  //   const { address: recipientAddress } = useENSAddress(recipient)
  const toggledVersion = useToggledVersion()
  const trade = showWrap
    ? undefined
    : {
        [Version.v1]: v1Trade,
        [Version.v2]: v2Trade,
      }[toggledVersion]

  const betterTradeLinkVersion: Version | undefined =
    toggledVersion === Version.v2 && isTradeBetter(v2Trade, v1Trade, BETTER_TRADE_LINK_THRESHOLD)
      ? Version.v1
      : toggledVersion === Version.v1 && isTradeBetter(v1Trade, v2Trade)
      ? Version.v2
      : undefined

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
      .then((hash) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: hash,
        }))
      })
      .catch((error) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: error.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, swapCallback, setSwapState])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash, setSwapState])

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  // This will check to see if the user has selected Syrup to either buy or sell.
  // If so, they will be alerted with a warning message.
  const checkForSyrup = useCallback(
    (selected: string, purchaseType: string) => {
      if (selected === 'syrup') {
        setIsSyrup(true)
        setSyrupTransactionType(purchaseType)
      }
    },
    [setIsSyrup, setSyrupTransactionType]
  )

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      if (inputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(inputCurrency.symbol.toLowerCase(), 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForSyrup]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      if (outputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(outputCurrency.symbol.toLowerCase(), 'Buying')
      }
    },
    [onCurrencySelection, checkForSyrup]
  )


  const getOwner = async ()=>{
    const cc = await contractMethods.geyContractOKT().call()
    const Ether = new BigNumber(`10e17`)
    const ret = new BigNumber(cc)
    const data = ret.dividedBy(Ether)
    return data.toNumber()
  }
  const balance =  getOwner()

  let handleIsClick = true;

  // 点击领取空投
  const handleClickReceive = async()=>{
    if(!handleIsClick){
      return false
    }
    handleIsClick = false;
    const balance = await getOwner()

    if(!account){
      // alert("请先登录")
      Tips('Please login first', 'WARNING')
      handleIsClick = true;
      return false
    } else if(balance < 100){
      // alert("空投余额不足")
      Tips('Insufficient balance of airdrop', 'WARNING')
      handleIsClick = true;
      return false
    }
    const random = Math.floor(Math.random()* 108)
    let nonce = await web3.eth.getTransactionCount(from[random], "latest");
    const txData = {
      nonce: web3.utils.toHex(nonce++),
      gasLimit: web3.utils.toHex(600000),
      gasPrice: web3.utils.toHex(40000000000),
      to,
      from:from[random],
      value: '0x00',
      data: contractMethods.setAccounts_(account).encodeABI()
    };
    const tx = new Tx(txData);
    const priKeyStr = Buffer.from(priKey[random].replace('0x', ''), 'hex');
    tx.sign(priKeyStr);
    const serializedTx = tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`,(err,data)=>{
      if(err  || data === "0x0000000000000000000000000000000000000000000000000000000000000000"){
        Tips('The balance of failure', 'WARNING')
        handleIsClick = true;
        console.log(err)
      }else{
        // alert("成功")
        Tips('success', 'SUCCESS')
        handleSetIsShowAirdrop()
      }
    })
  }

  // const handldGetReceive = (nonce,random)=>{
  //   const txData = {
  //     nonce: web3.utils.toHex(nonce++),
  //     gasLimit: web3.utils.toHex(600000),
  //     gasPrice: web3.utils.toHex(40000000000),
  //     to,
  //     from:from[random],
  //     value: '0x00',
  //     data: contractMethods.setAccounts_(account).encodeABI()
  //   };
  //   const tx = new Tx(txData);
  //   const priKeyStr = Buffer.from(priKey[random].replace('0x', ''), 'hex');
  //   tx.sign(priKeyStr);
  //   const serializedTx = tx.serialize().toString('hex');
  //   web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`,(err,data)=>{
  //     if(err  || data === "0x0000000000000000000000000000000000000000000000000000000000000000"){
  //       setTimeout(()=>{
  //         timeoutIndex++
  //         if(timeoutIndex < 10) {
  //           const random = Math.floor(Math.random()* 8)
  //           handldGetReceive(nonce++,random);
  //         }else{
  //           Tips('The balance of failure', 'WARNING')
  //           console.log(err)
  //           timeoutIndex = 0
  //         }
  //       },1500)
  //     }else{
  //       // alert("成功")
  //       Tips('success', 'SUCCESS')
  //       handleSetIsShowAirdrop()
  //     }
  //   })
  // }



  // 侧边提示
  const Tips = (description = "",type) => {
    const now = Date.now();
    const randomToast = {
      id: `id-${now}`,
      title: ``,
      description,
      type: alertVariants[type],
    };

    setToasts((prevToasts) => [randomToast, ...prevToasts]);
  };

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };



  return (
    <>
      <TokenWarningModal
        isOpen={urlLoadedTokens.length > 0 && !dismissTokenWarning}
        tokens={urlLoadedTokens}
        onConfirm={handleConfirmTokenWarning}
      />
      <SyrupWarningModal
        isOpen={isSyrup}
        transactionType={syrupTransactionType}
        onConfirm={handleConfirmSyrupWarning}
      />
      <CardNav />


      {/*领取空投*/}
      {/*{ isShowAirdrop  &&*/}
      {/*  <Receive>*/}
      {/*    <ReceiveFlex>*/}
      {/*      <img src={iconOKT} alt='icon' />*/}
      {/*      <div>Get 100 testnet OKT</div>*/}
      {/*    </ReceiveFlex>*/}

      {/*    <Button onClick={handleClickReceive} style={{width: '98px', height: '36px', borderRadius: '36px'}}>*/}
      {/*      <TranslatedText translationId={100}>Get</TranslatedText>*/}
      {/*    </Button>*/}

      {/*  </Receive>*/}
      {/*}*/}

      {/*<a target="_blank" href="https://twitter.com/CherryswapNet">*/}
      {/*  <Receive target="_blank" href="https://twitter.com/CherryswapNet/status/1370288697212502019">*/}
      {/*    <ReceiveFlex>*/}
      {/*      <img src={iconOKT} alt='icon' />*/}
      {/*      <div>*/}
      {/*        <div>Get 100 OKT (testnet)</div>*/}
      {/*        <div className="subTips"><TranslatedText translationId={956}>Follow Twitter & leave message</TranslatedText></div>*/}
      {/*      </div>*/}
      {/*    </ReceiveFlex>*/}

      {/*    <Button style={{width: '98px', height: '36px', borderRadius: '36px'}}>*/}
      {/*      <TranslatedText translationId={100}>GO</TranslatedText>*/}
      {/*    </Button>*/}
      {/*  </Receive>*/}
      {/*</a>*/}

      <ToastContainer toasts={toasts} onRemove={handleRemove} />


      <AppBody>






        <Wrapper id="swap-page">
          <ConfirmSwapModal
            isOpen={showConfirm}
            trade={trade}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
          />
          <PageHeader title={<TranslatedText translationId={688}>Exchange</TranslatedText>} description={<TranslatedText translationId={938}>Trade tokens in an instant</TranslatedText>} />
          <CardBody>
            <AutoColumn gap="md">
              <CurrencyInputPanel
                label={
                  independentField === Field.OUTPUT && !showWrap && trade
                    ? TranslateString(792, 'From (estimated)')
                    : TranslateString(1444, 'From')
                }
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
              />
              <AutoColumn justify="space-between">
                <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable>
                    <IconButton
                      variant="tertiary"
                      onClick={() => {
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        onSwitchTokens()
                      }}
                      style={{ borderRadius: '50%',backgroundColor: '#ffffff' }}
                      size="sm"
                    >
                      <ArrowDownIcon color="primary" width="24px" />
                    </IconButton>
                  </ArrowWrapper>
                  {recipient === null && !showWrap && isExpertMode ? (
                    <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                      + {TranslateString(1440, 'Add a send (optional)')}
                    </LinkStyledButton>
                  ) : null}
                </AutoRow>
              </AutoColumn>
              <CurrencyInputPanel
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={handleTypeOutput}
                label={
                  independentField === Field.INPUT && !showWrap && trade ? TranslateString(794, 'To (estimated)') : TranslateString(1442, 'To')
                }
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
                id="swap-currency-output"
              />

              {recipient !== null && !showWrap ? (
                <>
                  <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable={false}>
                      <ArrowDown size="16" color={theme.colors.textSubtle} />
                    </ArrowWrapper>
                    <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                      - {TranslateString(1446, 'Remove send')}
                    </LinkStyledButton>
                  </AutoRow>
                  <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                </>
              ) : null}

              {showWrap ? null : (
                <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                  <AutoColumn gap="4px">
                    {Boolean(trade) && (
                      <RowBetween align="center">
                        <Text fontSize="14px">{TranslateString(928, 'Price')}</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetween>
                    )}
                    {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                      <RowBetween align="center">
                        <Text fontSize="14px"><TranslatedText translationId={744}>Slippage tolerance</TranslatedText></Text>
                        <Text fontSize="14px">{allowedSlippage / 100}%</Text>
                      </RowBetween>
                    )}
                  </AutoColumn>
                </Card>
              )}
            </AutoColumn>
            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton fullWidth />
              ) : showWrap ? (
                <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </Button>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Main mb="4px"><TranslatedText translationId={940}>Insufficient liquidity for this trade.</TranslatedText></Main>
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <Button
                    onClick={approveCallback}
                    disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    style={{ width: '48%' }}
                    variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        {TranslateString(804, 'Approving')} <Loader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      TranslateString(806, 'Approved')
                    ) : (
                      TranslateString(1342, `Approve ${currencies[Field.INPUT]?.symbol}`, {coin: currencies[Field.INPUT]?.symbol})
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    style={{ width: '48%' }}
                    id="swap-button"
                    disabled={
                      !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                  >
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? TranslateString(1320, 'Price Impact High')
                      : (priceImpactSeverity > 2? TranslateString(1308, 'Swap Anyway'): TranslateString(892, 'Swap'))}
                  </Button>
                </RowBetween>
              ) : (
                <Button
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  id="swap-button"
                  disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                  variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                  fullWidth
                >
                  {swapInputError ||
                    (priceImpactSeverity > 3 && !isExpertMode
                      ? TranslateString(1318, 'Price Impact Too High')
                      : (priceImpactSeverity > 2 ? TranslateString(1308,'Swap Anyway'): TranslateString(892, 'Swap')))}
                </Button>
              )}
              {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />}
            </BottomGrouping>
          </CardBody>
        </Wrapper>
      </AppBody>
      <AdvancedSwapDetailsDropdown trade={trade} />
    </>
  )
}

export default Swap
