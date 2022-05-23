import React, { useEffect, useState } from 'react'
import { ArrowDown } from 'react-feather'
import { CardBody, ArrowDownIcon, Button, IconButton, Text,useModal } from '../../uikit'
import styled ,{ ThemeContext } from 'styled-components'
import axios from 'axios'

import { Wrapper } from '../../components/swap/styleds'

import AppBody from '../AppBody'
import SearchModal from './SearchModal'
import SearchNotModal from './SearchNoModal'
import CountDown from './countDown'
import { backgroundColor } from 'styled-system'


const PageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
  
`

const AirdropCard = styled.div`
    
`

const AirCheFlex = styled.div`
    display:flex;
    justify-content:space-between;
    background-color:#F9F7F8;
    padding:18px 30px;
    border-radius:20px;
    margin:30px;
`


const AirdropBg = styled.div`
    width:100%;
    height:201px;
    background: url('/images/bg_airdrop1.svg') no-repeat;
    background-size:contain;
`

const ConfirmBtn = styled.button`
    display:block;
    margin:0 auto;
    width: 90%;
    max-width:400px;
    height:48px;
    background:#E55268;
    color:#fff;
    border-radius:24px;
    border:none;
    font-size:20px;
    outline:none;
    cursor:pointer;
`

const PastWrap = styled.div`
    width: 90%;
    max-width:400px;
    height:88px;
    background:#f9f7f8;
    border-radius:20px;
    box-shadow: 0px 2px 30px 0px rgba(232,217,219,0.51);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:16px 14px;
    margin:0 auto 30px;
    .paste_btn{
        position:relative;
        padding-left:19px;
        cursor:pointer;
    }
    .paste_btn:before{
        content:'';
        display:block;
        width:1px;
        height:56px;
        background-color:#E8D9DB;
        position:absolute;
        left:0;
        top:-18px;
    }
    input{
        background:none;
        border:none;
        outline:none;
    }
`

const TeleBox = styled.div`
    margin:30px auto 14px;
    width: 138px;
    height: 30px;
    background: #f1c4cb;
    border-radius: 15px;
    box-shadow: 0px 2px 30px 0px rgba(232,217,219,0.51);
    .icon{
        display:block;
        width:18px;
        height:18px;
        background: url('/images/sidebar_telegram@2x.png') no-repeat;
        background-size:contain;
        margin-right:6px;
    }
    .tele_txt{
        font-size:14px;
        color:#E55268;
        font-style:italic;
    }
    a{
        display:flex;
        height:100%;
        justify-content:center;
        align-items:center;
    }
`

const Pagraph = styled.div`
    width:292px;
    margin:0 auto 30px;
    p{
        color:#8E8F99;
        font-size:14px;
        line-height:20px;
        text-align:center;
        font-style:italic;
    }
`

// const BASEURL = 'http://47.57.4.177:89'
// const BASEURL = 'http://127.0.0.1:7001'
const BASEURL = 'https://www.cherryswap.net'

const Airdrop = () => {

    const [confirmCount,setConfirmCount] = useState(0);
    const [hashInputValue,setHashInputValue] = useState('');
    const [openSearch] = useModal(<SearchModal />);
    const [openSearchNot] = useModal(<SearchNotModal />)
    const [isStart,setIsStart] = useState(1)

    const handleFetch = () => {
        const url = `${BASEURL}/api/findHashCode?addrid=${hashInputValue}`
        fetch(url,{
            method:'GET'
        }).then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.code === 200){
            openSearch()
          }else{
            openSearchNot()
          }
          FetchAll()
        })
    }
    const handleAddrFetch = () => {
        const url = `${BASEURL}/api/findAddress?addrid=${hashInputValue}`
        fetch(url,{
            method:'GET'
        }).then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.code === 200){
            openSearch()
          }else{
            openSearchNot()
          }
          FetchAll()
        })
    }
    const handleInputChange = (ev) => {
        setHashInputValue(ev.target.value)
    }

    const FetchAll = () => {
        const url = `${BASEURL}/api/findHashAll`;
        fetch(url,{
            method:'GET'
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.code === 200){
                setConfirmCount(data.data)
            }
        })
    }

    useEffect(()=>{
        FetchAll()
    },[])

  return (
    <>
      <AppBody>
        <Wrapper id="swap-page">
            <AirdropCard>
                <AirdropBg></AirdropBg>
                <CountDown setIsStart={setIsStart}></CountDown>
                <AirCheFlex>
                    <div style={{textAlign:'center'}}>
                        <p style={{fontSize:'18px',color:'#25030A',marginBottom:'14px'}}>750,000 CHE</p>
                        <p style={{fontSize:'14px',color:'#8E8F99'}}>Total amount of airdrop</p>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <p style={{fontSize:'18px',color:'#25030A',marginBottom:'14px'}}>{confirmCount}/15,000</p>
                        <p style={{fontSize:'14px',color:'#8E8F99'}}>Confirmed address qty</p>
                    </div>
                </AirCheFlex>
                <PastWrap>
                    <input type="text" value={hashInputValue} onChange={handleInputChange} style={{color:'#25030A',flex:'1',fontSize:'16px',lineHeight:'19px',paddingRight:'14px',wordBreak:'break-all'}} placeholder="0x..." />

                </PastWrap>
                {
                    isStart === 3 ? (<ConfirmBtn onClick={handleFetch}>summit</ConfirmBtn>) : (isStart === 1 ? <ConfirmBtn style={{backgroundColor:'#ccc'}}>summit</ConfirmBtn> : <ConfirmBtn onClick={handleAddrFetch}>summit</ConfirmBtn>)
                }
                <TeleBox>
                    <a href="https://t.me/cherryswap_1st" target="_blank">
                        <i className="icon"></i>
                        <p className="tele_txt">Telegram-EN</p>
                    </a>
                </TeleBox>
                <Pagraph>
                    <p>Please follow our Telegram-EN community for more info about project activities.</p>
                </Pagraph>
            </AirdropCard>
        </Wrapper>
      </AppBody>
    </>
  )
}

export default Airdrop
