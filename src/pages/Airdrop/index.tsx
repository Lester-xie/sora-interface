import React, { useEffect, useState, useCallback } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Text,useModal } from '../../uikit'
import styled ,{ ThemeContext } from 'styled-components'
import { isAddress } from '../../utils'
import axios from 'axios'

import { Modal } from '../../uikit'


import { Wrapper } from '../../components/swap/styleds'

import AppBody from '../AppBody'
import SearchModal from './SearchModal'
import SearchNotModal from './SearchNoModal'
import { backgroundColor } from 'styled-system'
import useI18n from 'hooks/useI18n'


const PicBox = styled.div`
    width:100%;
    height:201px;
    background:url('/images/bg_airdrop1@2x.png') no-repeat;
    background-size:contain;
`

const AirContent = styled.div`
    padding:54px 30px 33px;
    .input_box{
        padding-bottom:30px;
        .tips{
            font-size:12px;
            line-height:14px;
            margin-top:8px;
            color:#F29731;
        }
    }
    .input{
        width: 100%;
        max-width:400px;
        height: 74px;
        background:#f9f7f8;
        border-radius: 29px;
      
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:16px 14px;
        margin:30px auto 0;
    }
    textarea {
        resize: none;
        width:100%;
        background: none;
        border: none;
        outline: none;
      }
    .check_list{
        display:block;
        color:#E55268;
        line-height:16px;
        font-size:14px;
        font-style:italic;
        margin:22px 0 22px 9px;
    }
    .follow{
        font-size:14px;
        color:#8E8F99;
        line-height:20px;
        text-align:center;
        padding:0 6px;
        font-style: italic; 
    }
`
const ConfirmBtn = styled.button`
    display:block;
    margin:0 auto;
    width: 100%;
    height:48px;
    background:#E55268;
    color: #ABABAB;
    border-radius:24px;
    border:none;
    font-size:20px;
    outline:none;
    cursor:pointer;
`
const TeleBox = styled.div`
    margin: 0 auto 14px;
    width: 138px;
    height: 30px;
    background: rgba(229,82,104,0.1);
    border-radius: 15px;

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
        color: #e55268;
        font-style: italic;
    }

    a {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
`

const reg = /^[a-z0-9A-Z]+$/;

// const BASEURL = 'http://t1.cherryswap.net'
// const BASEURL = 'http://127.0.0.1:7001'
const BASEURL = 'https://www.cherryswap.net'

// const BASEURL = 'http://t1.cherryswap.net'


const queryFetch = (url) => {
    return new Promise((resolve,reject) => {
        fetch(url,{
            method:'GET',
        }).then(res => res.json())
        .then(data => {
          resolve(data)
        })       
    })
}


const Airdrop = () => {
    const [inputValue,setInputValue] = useState('');
    const [succNums,setSuccNums] = useState('0');
    const [inputErr,setInputErr] = useState(true);
    const [isOpen,setIsOpen] = useState(false);
    const [openSearchNot, setOpenSearchNot] = useState(false)
    // const [searchNot] = useModal(<SearchNotModal />);
    const TranslateString = useI18n()

    const handleInputChange = (event)=>{
        const val = event.target.value;


        if(!reg.test(val)){
            setInputErr(true);
        }else{
            setInputErr(false);
        }
        setInputValue(val);
    }

    const handleSubmit = async ()=>{

        if(!reg.test(inputValue)){
            setInputErr(true);
            return;
        }
        setInputErr(false);


        const url = `${BASEURL}/api/v2/findAddress?addrId=${inputValue}`

        const result:any= await queryFetch(url);
        if(result.code === 200 ){
            setSuccNums(result.data.balance);
            setIsOpen(true);
            // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        }else{
            setOpenSearchNot(true)
            // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        }
    }
    const closeModal = () => {
        setIsOpen(false)
        // document.querySelector('body').removeAttribute('style')
    }
    const closeNotModal = () => {
        setOpenSearchNot(false)
        // document.querySelector('body').removeAttribute('style')
    }
    
    return (
        <>
        <AppBody>
            <Wrapper id="swap-page">
                <PicBox></PicBox>
                <AirContent>
                    <div className="input_box">
                        <div className="input">
                        <textarea rows={2}  value={inputValue} onChange={handleInputChange} placeholder="0x..." />
                        </div>
                        
                        {
                            inputErr ? (<p className="tips">{TranslateString(1286, 'Please fill in the correct wallet address used when participating in the Joint beta of CherrySwap&OKExChain.')}</p>) : (<></>)
                        }
                    </div>
                    {
                        inputErr ? (<ConfirmBtn style={{background:'#DFDFDF'}}>{TranslateString(1288, 'View')}</ConfirmBtn>) : (<ConfirmBtn style={{color: '#fff'}} onClick={handleSubmit}>{TranslateString(1288, 'View')}</ConfirmBtn>)
                    }
                    <a className="check_list" href="https://docs.cherryswap.net/activity/the-joint-beta-of-cherryswap-and-okexchain/airdrop-list-round-1" target="_blank">{TranslateString(1296, 'Click here to view the full list')}</a>
                    <TeleBox>
                        <a href="https://t.me/cherryswap_1st" target="_blank">
                            <i className="icon"></i>
                            <p className="tele_txt">Telegram-EN</p>
                        </a>
                    </TeleBox>
                    <p className="follow">{TranslateString(1298, 'Please follow our Telegram-EN community for more info about project activities.')}</p>
                </AirContent>
            </Wrapper>
            {
                isOpen && <SearchModal nums={succNums} onDismiss={()=>{closeModal()}}></SearchModal>
            }
            {
                openSearchNot && <SearchNotModal onDismiss={()=>{closeNotModal()}}></SearchNotModal>
            }
        </AppBody>
        </>
    )
}

export default Airdrop
