import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    //display: none;
  }
`

const Info = styled.img`
  width: 100%;
`

const Farm: React.FC = () => {
  return (
    <Wrap>
      <Info src='./images/info.png' alt='info' />
    </Wrap>
  )
}

export default Farm
