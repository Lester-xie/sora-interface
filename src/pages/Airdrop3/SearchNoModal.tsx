import React from 'react'
import { Modal } from '../../uikit'
import styled from 'styled-components'

type SearchModalProps = {
  onDismiss?: () => void
}

const ContentWrap = styled.div`
    padding:0 30px;
`
const ResHas = styled.div`
    text-align:center;
    .title{
        font-size:20px;
        color:#8E8F99;
        line-height:24px;
        margin:70px 0;
    }
    .nums{
        width: 100%;
        max-width:400px;
        margin:0 auto 10px;
        font-size:14px;
        color:#25030A;
        line-height:20px;
        text-align:left;
        text-align:center;
        span{
            color:#E55268;
        }
    }
`

const ConfirmBtn = styled.button`
    width: 100%;
    max-width:400px;
    height:48px;
    background: #E55268;
    border-radius: 24px;
    box-shadow: 0px 2px 8px 0px #ddc9cc;
    color:#fff;
    font-size:20px;
    text-shadow: 0px 2px 8px 0px #ddc9cc;
    outline:none;
    border:none;
    cursor:pointer;
`

const ModalWrap = styled.div`
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    .mask{
        width:100%;
        height:100%;
        background-color:#000;
        opacity:0.5;
    }
    .wrap{
        position:absolute;
        top:50%;
        left:50%;
        z-index:999;
        transform:translate(-50%,-50%);
    }
`

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SearchModal = ({ onDismiss = defaultOnDismiss }: SearchModalProps) => {
  return (
    <ModalWrap>
    <div className="mask"></div>
        <div className="wrap">
            <Modal title="Search Result" onDismiss={onDismiss}>
                <ContentWrap>
                    <ResHas>
                        <p className="title">Not qualified for airdrop.</p>
                        <p className="nums">Please follow our <span>Telegram-EN</span> community for more info about project activities.</p>
                    </ResHas>

                    <ConfirmBtn onClick={onDismiss}>close</ConfirmBtn>
                </ContentWrap>
            </Modal>
        </div>
    </ModalWrap>
  )
}

export default SearchModal

