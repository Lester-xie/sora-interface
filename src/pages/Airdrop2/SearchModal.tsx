import React from 'react'
import { Modal } from '../../uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

type SearchModalProps = {
  onDismiss?: () => void,
}

const ContentWrap = styled.div`
    padding:0 30px;
`
const ResHas = styled.div`
    text-align:center;
    .title{
        font-size:20px;
        color:#25030A;
        line-height:24px;
        margin-bottom:20px;
    }
    p {
        line-height: 20px;
    }
    .nums{
        font-size:40px;
        color:#E55268;
        font-weight:600;
        line-height:48px;
        margin-bottom:20px;
    }
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

const ConfirmBtn = styled.button`
    width:100%;
    height:48px;
    background: #E55268;
    border-radius: 24px;
    color:#fff;
    font-size:20px;
    outline:none;
    border:none;
    margin-top:46px;
    cursor:pointer;
`

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SearchModal = ({ onDismiss = defaultOnDismiss}: SearchModalProps) => {
  const TranslateString = useI18n()

  return (
    <ModalWrap>
        <div className="mask"></div>
        <div className="wrap">
            <Modal title={TranslateString(1290, "Search Result")} onDismiss={onDismiss}>
                <ContentWrap>
                    <ResHas>
                      <p className='title'>You can get at least</p>
                      <p className='nums'>50 CHE</p>
                      <p className='desc'>(Depends on actual qty applied)</p>
                      <p className='times'>The airdrop will be distributed after deploying the mainnet</p>
                      <p className='times'>This qualification just for airdrop round 2.</p>
                    </ResHas>

                    <ConfirmBtn onClick={onDismiss}>close</ConfirmBtn>
                </ContentWrap>
            </Modal>
        </div>
        
    </ModalWrap>
      
    
  )
}

export default SearchModal

