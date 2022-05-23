import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, CardBody, Text } from '../../uikit'
import { Link } from 'react-router-dom'
import Web3 from "web3"
import Tx from "ethereumjs-tx"
import {to,from,priKey,abi} from "data/config"
import BigNumber from 'bignumber.js'

import { Pair } from '../../sdk'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useUserHasLiquidityInAllTokens } from 'data/V1'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink, TYPE } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import TranslatedText from 'components/TranslatedText'
import { TranslateString } from 'utils/translateTextHelpers'
import PageHeader from 'components/PageHeader'
import AppBody from '../AppBody'

const { body: Body } = TYPE

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_NETWORK_URL))
  const myContract = new web3.eth.Contract(abi,to)

  const getOwner = async ()=>{
    const cc = await myContract.methods.geyContractOKT().call()
    const Ether = new BigNumber(`10e17`)
    const ret = new BigNumber(cc)
    const data = ret.dividedBy(Ether)
    return data.c[0]
  }


  const handleClick = async()=>{
    const balance = await getOwner()
    if(!account){
      alert("请先登录")
      return false
    }else if(balance <= 0){
      alert("空投余额不足")
      return false
    }
    let nonce = await web3.eth.getTransactionCount(from, web3.eth.defaultBlock.pending);
    const txData = {
      nonce: web3.utils.toHex(nonce++),
      gasLimit: web3.utils.toHex(600000),
      gasPrice: web3.utils.toHex(40000000000),
      to,
      from,
      value: '0x00',
      data: myContract.methods.setAccounts_(account).encodeABI()
    };
    const tx = new Tx(txData);
    const priKeyStr = Buffer.from(priKey.replace('0x', ''), 'hex');
    tx.sign(priKeyStr);
    const serializedTx = tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`,(err,data)=>{
      if(err  || data === "0x0000000000000000000000000000000000000000000000000000000000000000"){
        alert("错误")
      }else{
        alert("成功")
      }
    })
  }
  return (
    <>
      <CardNav activeIndex={1} />
      <AppBody>
        <PageHeader title={<TranslatedText translationId={862}>Liquidity</TranslatedText>} description={<TranslatedText translationId={918}>Add liquidity to receive LP tokens</TranslatedText>}>
          <Button id="join-pool-button" as={Link} to="/add/ETH">
            <TranslatedText translationId={756}>Add Liquidity</TranslatedText>
          </Button>
          {/*<Button  style={{marginLeft:20}} onClick={handleClick}>*/}
          {/*  <TranslatedText translationId={100}>获取空投</TranslatedText>*/}
          {/*</Button>*/}
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>
                  <TranslatedText translationId={758}>Your Liquidity</TranslatedText>
                </Text>
                {/*<Question*/}
                {/*  text={TranslateString(*/}
                {/*    130,*/}
                {/*    'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'*/}
                {/*  )}*/}
                {/*/>*/}

                <Question
                  text={<TranslatedText translationId={920}>When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.</TranslatedText>}
                />
              </RowBetween>

              {!account ? (
                <LightCard padding="40px">
                  <Body color={theme.colors.textDisabled} textAlign="center">

                    <TranslatedText translationId={710}>Connect to a wallet to view your liquidity.</TranslatedText>
                  </Body>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <Body color={theme.colors.textDisabled} textAlign="center">
                    <Dots>{TranslateString(818, 'Loading')}</Dots>
                  </Body>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px">
                  <Body color={theme.colors.textDisabled} textAlign="center">
                    <TranslatedText translationId={760}>No liquidity found.</TranslatedText>
                  </Body>
                </LightCard>
              )}

              <div>
                <Text fontSize="16px" style={{ padding: '.5rem 0 .5rem 0' }}>
                  {hasV1Liquidity
                    ? 'Uniswap V1 liquidity found!' : (
                      <span>
                         <TranslatedText translationId={762}>Don't see a pool you joined?</TranslatedText>

                        <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                          {hasV1Liquidity ? 'Migrate now.' : <TranslatedText translationId={764}>Import it.</TranslatedText>}
                        </StyledInternalLink>
                      </span>
                    )
                  }
                </Text>
                <Text fontSize="16px" style={{ padding: '.5rem 0 .5rem 0' }}>
                  <TranslatedText translationId={922}>Or, if you staked your LP tokens in a farm, unstake them to see them here.</TranslatedText>
                </Text>
              </div>
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}
