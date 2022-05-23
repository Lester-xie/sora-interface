import React, { useEffect, useState, useRef } from 'react'
import { ArrowDown } from 'react-feather'
import { CardBody, ArrowDownIcon, Button, IconButton, Text, useModal } from '../../uikit'
import styled, { ThemeContext, keyframes } from 'styled-components'
import axios from 'axios'
import HCaptcha from '@hcaptcha/react-hcaptcha'

import { Wrapper } from '../../components/swap/styleds'

import AppBody from '../AppBody'
import SearchModal from './SearchModal'
import SearchNotModal from './SearchNoModal'
import CountDown from './countDown'
import useI18n from 'hooks/useI18n'

const PageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;

`

const AirdropCard = styled.div`

`

const AirCheFlex = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #F9F7F8;
  padding: 18px 30px;
  border-radius: 20px;
  margin: 30px;
`


const AirdropBg = styled.div`
  width: 100%;
  height: 201px;
  background: url('/images/bg_airdrop3@3x.png') no-repeat;
  background-size: contain;
`

const ViewBox = styled.div`
  padding: 0 30px;
`


const ConfirmBtn = styled.button`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 48px;
  background: #E55268;
  color: #ABABAB;
  border-radius: 24px;
  border: none;
  font-size: 20px;
  outline: none;
  cursor: pointer;
`

const PastWrap = styled.div`
  max-width: 400px;
  height: 74px;
  background: #f9f7f8;
  border-radius: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 14px;
  margin: 0 30px;

  .paste_btn {
    position: relative;
    padding-left: 19px;
    cursor: pointer;
  }

  .paste_btn:before {
    content: '';
    display: block;
    width: 1px;
    height: 56px;
    background-color: #E8D9DB;
    position: absolute;
    left: 0;
    top: -18px;
  }

  textarea {
    resize: none;
    background: none;
    border: none;
    outline: none;
  }
`
const Tips = styled.div`
  margin: 30px;

  .input_box {

    .tips {
      font-size: 12px;
      line-height: 14px;
      margin-top: 8px;
      color: #F29731;
    }
  }
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Verify = styled.div`
  max-width: 400px;
  cursor: pointer;
  height: 54px;
  opacity: 1;
  background: #f9f7f8;
  border: 1px solid #e3e3e3;
  border-radius: 21px;
  padding: 16px 14px;
  margin: 0 30px 30px 30px;
  box-shadow: 0px 2px 30px 0px rgba(232, 217, 219, 0.51);
  display: flex;
  align-items: center;

  .icon {
    display: block;
    width: 24px;
    height: 24px;
    background: url('/images/icon_airdrop_kuang.svg') no-repeat;
    background-size: contain;
    margin-right: 6px;
  }

  .loading {
    display: block;
    width: 24px;
    height: 24px;
    background: url('/images/icon_airdrop_kuang@3x.png') no-repeat;
    background-size: contain;
    margin-right: 6px;
  }

  .loading {
    animation: ${rotate} 1s linear infinite;
  }

  .text {
    font-size: 14px;
    font-weight: 500;
    color: #25030a;
  }

  .is-loading {
    color: #E55268;
  }
`

const VerifySuccess = styled.div`
  max-width: 400px;
  height: 54px;
  opacity: 1;
  background: #fff8f9;
  border: 1px solid #e55268;
  border-radius: 21px;
  box-shadow: 0px 2px 30px 0px rgba(232, 217, 219, 0.51);
  padding: 16px 14px;
  margin: 0 30px 30px 30px;
  display: flex;
  align-items: center;

  .icon {
    display: block;
    width: 24px;
    height: 24px;
    background: url('/images/icon_airdrop_access@3x.png') no-repeat;
    background-size: contain;
    margin-right: 6px;
  }

  .text {
    font-size: 14px;
    font-weight: 500;
    color: #e55268;
  }
`

const Btn = styled.div`
  width: 400px;
  height: 54px;
  opacity: 1;
  background: #f9f7f8;
  border: 1px solid #e3e3e3;
  border-radius: 21px;
  box-shadow: 0px 2px 30px 0px rgba(232, 217, 219, 0.51);
  position: absolute;
  left: 30px;
  top: 0;
`

const TeleBox = styled.div`
  margin: 30px auto 14px;
  width: 138px;
  height: 30px;
  background: rgba(229,82,104,0.1);
  border-radius: 15px;
  //box-shadow: 0px 2px 30px 0px rgba(232, 217, 219, 0.51);

  .icon {
    display: block;
    width: 18px;
    height: 18px;
    background: url('/images/sidebar_telegram@2x.png') no-repeat;
    background-size: contain;
    margin-right: 6px;
  }

  .tele_txt {
    font-size: 14px;
    color: #E55268;
    font-style: italic;
  }

  a {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`

const Pagraph = styled.div`
  width: 292px;
  margin: 0 auto 30px;

  p {
    color: #8E8F99;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    font-style: italic;
  }
`

// const BASEURL = 'http://192.168.10.72:8787'
// const BASEURL = 'http://127.0.0.1:7001'
const BASEURL = 'https://www.cherryswap.net'


// const BASEURL = 'http://t1.cherryswap.net'


const Airdrop = () => {

  const [info, setInfo] = useState({
    confirmed: 0,
    limit: 0,
    token: '',
    totalBalance: ''
  })
  const [hashInputValue, setHashInputValue] = useState('')
  // const [openSearch] = useModal(<SearchModal />);
  const TranslateString = useI18n()
  // const [openSearchNot] = useModal(<SearchNotModal />)
  const [isStart, setIsStart] = useState(1)
  const [timerObj, setTimerObj] = useState({})
  const [inputErr, setInputErr] = useState(true)
  const [isVerify, setIsVerify] = useState(false)
  const [token, setToken] = useState('')
  const [errorText, setErrorText] = useState(TranslateString(1286, 'Please fill in the correct wallet address used when participating in the Joint beta of CherrySwap&OKExChain.'))
  const [isOpen, setIsOpen] = useState(false)
  const [openSearchNot, setOpenSearchNot] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notStart, setNotStart] = useState(true)
  const [isOver, setIsOver] = useState(false)
  const [loading, setLoading] = useState(false)

  const captchaRef = useRef(null)

  const getCookie = (name) => {
    var strcookie = document.cookie //获取cookie字符串
    var arrcookie = strcookie.split('; ') //分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=')
      if (arr[0] === name) {
        return arr[1]
      }
    }
    return ''
  }
  const handleConfirmAddress = () => {
    const url = `${BASEURL}/api/v3/confirmAddress`
    setLoading(true)
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'cookieUser': localStorage.getItem('user') || ''
      },
      body: JSON.stringify({//请求的参数
        addrId: hashInputValue,
        captchaToken: token || '000'
      })
    }).then(res => res.json())
      .then(data => {


        if (data.code === 200) {
          setIsOpen(true)
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        } else if (data.code === 30107) {
          setErrorText('Operated frequently, you can query after the activity')
          setInputErr(true)
        } else if (data.code === 30108) {
          setErrorText('Confirmed, you can get at least 60 CHE.')
          setInputErr(true)
        } else {
          setOpenSearchNot(true)
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        }
        FetchAll()
        setIsVerify(false)
        setLoading(false)
      })
  }
  const handleInputChange = (ev) => {
    const reg = /^[a-z0-9A-Z]+$/

    if (!reg.test(ev.target.value)) {
      setErrorText(TranslateString(1286, 'Please fill in the correct wallet address used when participating in the Joint beta of CherrySwap&OKExChain.'))
      setInputErr(true)
    } else {
      setInputErr(false)
    }
    setHashInputValue(ev.target.value)

  }

  const FetchAll = () => {
    const url = `${BASEURL}/api/v3/info`

    fetch(url, {
      method: 'GET'
    }).then(res => res.json())
      .then(data => {

        if (data.code === 200) {
          if (data.data.nowTime < data.data.startTime) {
            setNotStart(true)
          } else {
            setNotStart(false)
          }
          if (data.data.nowTime > data.data.endTime) {
            setIsOver(true)
          } else {
            setIsOver(false)
          }

          setInfo({
            confirmed: data.data.confirmed,
            limit: data.data.limit,
            token: data.data.token,
            totalBalance: data.data.totalBalance
          })
          setTimerObj({
            startTime: data.data.startTime,
            endTime: data.data.endTime,
            nowTime: data.data.nowTime
          })
        }
      })
  }
  const handleVerificationSuccess = (token) => {
    console.log(token, 'tokne--===++')
    setToken(token)
    setIsVerify(true)

    const reg = /^[a-z0-9A-Z]+$/
    if (!reg.test(hashInputValue)) {
      setErrorText(TranslateString(1286, 'Please fill in the correct wallet address used when participating in the Joint beta of CherrySwap&OKExChain.'))
      setInputErr(true)
    } else {
      setInputErr(false)
    }
  }
  const handleVerifError = (error) => {
    console.log(error, 'error----++++')
  }

  const onSubmit = () => {
    setIsLoading(true)
    captchaRef.current.execute()
  }

  const closeModal = () => {
    setIsOpen(false)
    // document.querySelector('body').removeAttribute('style')
  }
  const closeNotModal = () => {
    setOpenSearchNot(false)
    // document.querySelector('body').removeAttribute('style')
  }
  const handleOpenCallback = () => {
    setIsLoading(false)
  }
  useEffect(() => {
    FetchAll()
  }, [])

  return (
    <>
      {}
      <AppBody>
        <Wrapper id='swap-page'>

          <AirdropCard>
            <AirdropBg></AirdropBg>
            <CountDown
              activityOver={info.confirmed >= info.limit} setIsStart={setIsStart}
              timerObj={timerObj}></CountDown>
            {
              info.limit > 0 &&
              <AirCheFlex>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontSize: '18px',
                    color: '#25030A',
                    marginBottom: '14px'
                  }}>{info.totalBalance} {info.token}</p>
                  <p style={{
                    fontSize: '14px',
                    color: '#8E8F99'
                  }}>{TranslateString(1280, 'Total amount of airdrop')}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontSize: '18px',
                    color: '#25030A',
                    marginBottom: '14px'
                  }}>{info.confirmed}/{info.limit}</p>
                  <p style={{ fontSize: '14px', color: '#8E8F99' }}>{TranslateString(1282, 'Confirmed address qty')}</p>
                </div>
              </AirCheFlex>
            }

            <PastWrap>
              <textarea rows={2} value={hashInputValue} onChange={handleInputChange} style={{
                color: '#25030A',
                flex: '1',
                fontSize: '16px',
                lineHeight: '19px',
                paddingRight: '14px',
                wordBreak: 'break-all'
              }} placeholder='0x...' />

            </PastWrap>
            <Tips>
              <div className='input_box'>
                {
                  inputErr ? (<p className='tips'>{errorText}</p>) : (<></>)
                }
              </div>
            </Tips>

            {isVerify ?
              <VerifySuccess>
                <i className='icon'></i>
                <span className='text'>Verified successfully</span>
              </VerifySuccess>
              :
              <Verify onClick={onSubmit}>
                {isLoading ? <i className='loading'></i> : <i className='icon'></i>}
                {isLoading ?
                  <span className='is-loading'>Loading...</span>
                  :
                  <span className='text'>{TranslateString(1302, 'Click verify identity')}</span>
                }

              </Verify>
            }
            <HCaptcha
              size='invisible'
              sitekey='19f10219-a1cc-4cad-be56-3d9303ce7eb3'
              // languageOverride="en"
              open-callback={handleOpenCallback}
              onVerify={(token) => handleVerificationSuccess(token)}
              onError={(error) => {
                handleVerifError(error)
              }}
              ref={captchaRef}
            />

            <ViewBox>
              {
                isVerify && !inputErr && !notStart && !loading ?
                  (<ConfirmBtn
                    style={{color: '#fff'}}
                    onClick={handleConfirmAddress}>{isOver || info.confirmed >= info.limit ? TranslateString(1288, 'View') : 'Submit'}</ConfirmBtn>)
                  : (<ConfirmBtn
                    style={{ background: '#DFDFDF' }}>{isOver || info.confirmed >= info.limit ? TranslateString(1288, 'View') : 'Submit'}</ConfirmBtn>)
              }
            </ViewBox>
            <TeleBox>
              <a href='https://t.me/cherryswap_1st' target='_blank'>
                <i className='icon'></i>
                <p className='tele_txt'>Telegram-EN</p>
              </a>
            </TeleBox>
            <Pagraph>
              <p>{TranslateString(1298, 'Please follow our Telegram-EN community for more info about project activities.')}</p>
            </Pagraph>
          </AirdropCard>
        </Wrapper>
        {
          openSearchNot && <SearchNotModal onDismiss={() => {
            closeNotModal()
          }}></SearchNotModal>
        }
        {
          isOpen && <SearchModal onDismiss={() => {
            closeModal()
          }}></SearchModal>
        }
      </AppBody>
    </>
  )
}

export default Airdrop
