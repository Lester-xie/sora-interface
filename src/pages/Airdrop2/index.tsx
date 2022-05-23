import React, { useEffect, useState } from 'react'
import { useModal } from '../../uikit'
import styled from 'styled-components'
import { Wrapper } from '../../components/swap/styleds'
import AppBody from '../AppBody'
import SearchModal from './SearchModal'
import SearchNotModal from './SearchNoModal'
import CountDown from './countDown'
import useI18n from 'hooks/useI18n'


const AirdropCard = styled.div`

  .tips {
    margin: 8px 30px 0 30px;
    font-size: 12px;
    line-height: 14px;
    color: #F29731;
  }
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
  background: url('/images/bg_airdrop2_view@2x.png') no-repeat;
  background-size: contain;
`

const ConfirmBtn = styled.button`
  display: block;
  margin: 30px auto 0 auto;
  width: 90%;
  max-width: 400px;
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

  width: 90%;
  max-width: 400px;
  height: 74px;
  background: #f9f7f8;
  border-radius: 29px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 14px;
  margin: 30px auto 0;

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

// const BASEURL = 'http://47.57.4.177:89'
// const BASEURL = 'http://127.0.0.1:7001'
const BASEURL = 'https://www.cherryswap.net'

// const BASEURL = 'http://t1.cherryswap.net'

const Airdrop = () => {

  const [confirmCount, setConfirmCount] = useState(0)
  const [hashInputValue, setHashInputValue] = useState('')
  // const [openSearch] = useModal(<SearchModal />);
  // const [openSearchNot] = useModal(<SearchNotModal />)
  const [isStart, setIsStart] = useState(1)
  const [inputErr, setInputErr] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [openSearchNot, setOpenSearchNot] = useState(false)
  const TranslateString = useI18n()

  const handleFetch = () => {
    const url = `${BASEURL}/api/findHashCode?addrid=${hashInputValue}`
    fetch(url, {
      method: 'GET'
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          setIsOpen(true)
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        } else {
          setOpenSearchNot(true)
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        }
        FetchAll()
      })
  }
  const handleAddrFetch = () => {
    const url = `${BASEURL}/api/findAddress?addrid=${hashInputValue}`
    fetch(url, {
      method: 'GET'
    }).then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          setIsOpen(true)
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        } else {
          setOpenSearchNot(true)
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        }
        FetchAll()
      })
  }
  const handleInputChange = (ev) => {
    const reg = /^[a-z0-9A-Z]+$/

    if (!reg.test(ev.target.value)) {
      setInputErr(true)
    } else {
      setInputErr(false)
    }
    setHashInputValue(ev.target.value)
  }

  const FetchAll = () => {
    const url = `${BASEURL}/api/findHashAll`
    fetch(url, {
      method: 'GET'
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          setConfirmCount(data.data)
        }
      })
  }

  const closeModal = () => {
    setIsOpen(false)
    // document.querySelector('body').removeAttribute('style')
  }
  const closeNotModal = () => {
    setOpenSearchNot(false)
    // document.querySelector('body').removeAttribute('style')
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
            {/* <CountDown setIsStart={setIsStart}></CountDown>
                <AirCheFlex>
                    <div style={{textAlign:'center'}}>
                        <p style={{fontSize:'18px',color:'#25030A',marginBottom:'14px'}}>750,000 CHE</p>
                        <p style={{fontSize:'14px',color:'#8E8F99'}}>Total amount of airdrop</p>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <p style={{fontSize:'18px',color:'#25030A',marginBottom:'14px'}}>{confirmCount}/15,000</p>
                        <p style={{fontSize:'14px',color:'#8E8F99'}}>Confirmed address qty</p>
                    </div>
                </AirCheFlex> */}
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
            {
              inputErr ? (
                <p className='tips'>{TranslateString(1286, 'Please fill in the correct wallet address used when participating in the Joint beta of CherrySwap&OKExChain.')}</p>) : (<></>)
            }
            {
              inputErr ? (<ConfirmBtn style={{ background: '#DFDFDF' }}>{TranslateString(1288, 'View')}</ConfirmBtn>) : (
                <ConfirmBtn style={{color: '#fff'}} onClick={handleAddrFetch}>{TranslateString(1288, 'View')}</ConfirmBtn>)
            }
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
