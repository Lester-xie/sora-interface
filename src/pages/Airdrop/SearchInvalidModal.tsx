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

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SearchInvaildModal = ({ onDismiss = defaultOnDismiss }: SearchModalProps) => {
  return (
    <Modal title="Search Result" onDismiss={onDismiss}>
        <ContentWrap>
            <ResHas>
                <p className="title">Invalid address</p>
            </ResHas>

            <ConfirmBtn onClick={onDismiss}>close</ConfirmBtn>
        </ContentWrap>
    </Modal>
  )
}

export default SearchInvaildModal
