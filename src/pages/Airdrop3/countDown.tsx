import React, { useEffect, useState, useCallback, useRef } from 'react'
import useI18n from 'hooks/useI18n'

import styled from 'styled-components'

const AirState = styled.div`
  text-align: center;
  margin: 46px 0;
  font-size: 20px;
  color: #8E8F99;
`

const AirCountDown = styled.div`
  .title {
    text-align: center;
    font-size: 16px;
    color: #8E8F99;
    margin: 30px 0 18px;
  }

  .time_down {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    //flex-wrap: nowrap;
  }

  .time_item {
    display: flex;
    text-align: center;

    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      background-color: rgba(229, 82, 104, 0.2);
      font-size: 22px;
      color: #E55268;
      line-height: 42px;
      border-radius: 11px;
      box-shadow: 0px 2px 30px 0px rgba(232, 217, 219, 0.51);
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .m-h {
    color: #E55268;
    font-size: 40px;
    margin: -7px 8px 0;
  }
`

const CountDown = ({ activityOver, setIsStart, timerObj }) => {
  const [isOver, setIsOver] = useState(false)
  const [isNotStarted, setIsNotStarted] = useState(true)

  const timer = useRef(null)
  const TranslateString = useI18n()

  const [data, setData] = useState({
    hourseOne: '0',
    hourseTwo: '0',
    miniteOne: '0',
    miniteTwo: '0',
    secondOne: '0',
    secondTwo: '0'
  })

  const countFun = useCallback((activityOver, startTime, stamptimes, endTime) => {

    if (activityOver) {
      setIsOver(true)
      setIsNotStarted(false)
      return
    }
    const nowTime = stamptimes

    if (nowTime < startTime) {
      console.log()
      setIsOver(false)
      setIsNotStarted(true)
      setIsStart(1)
      setTimeout(() => {
        stamptimes += 1000

        countFun(activityOver, startTime, stamptimes, endTime)
      }, 1000)
    } else if (nowTime > endTime) {
      setIsOver(true)
      setIsNotStarted(false)
      setIsStart(2)
    } else {
      setIsOver(false)
      setIsStart(3)
      setIsNotStarted(false)
      const lefttime = endTime - nowTime
      const lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24)
      const leftm = Math.floor(lefttime / (1000 * 60) % 60)
      const lefts = Math.floor(lefttime / 1000 % 60)
      setData({
        hourseOne: lefth.toString().length === 1 ? '0' : lefth.toString().substring(0, 1),
        hourseTwo: lefth.toString().length === 1 ? lefth.toString().substring(0, 1) : lefth.toString().substring(1, 2),
        miniteOne: leftm.toString().length === 1 ? '0' : leftm.toString().substring(0, 1),
        miniteTwo: leftm.toString().length === 1 ? leftm.toString().substring(0, 1) : leftm.toString().substring(1, 2),
        secondOne: lefts.toString().length === 1 ? '0' : lefts.toString().substring(0, 1),
        secondTwo: lefts.toString().length === 1 ? lefts.toString().substring(0, 1) : lefts.toString().substring(1, 2)
      })
      timer.current = setTimeout(() => {

        stamptimes += 1000

        countFun(activityOver, startTime, stamptimes, endTime)
      }, 1000)
    }
  }, [setData, setIsOver, setIsNotStarted, setIsStart])

  useEffect(() => {
    clearTimeout(timer.current)

    if (timerObj.startTime) {
      countFun(activityOver, timerObj.startTime, timerObj.nowTime, timerObj.endTime)
    }

  }, [countFun, timerObj, activityOver])

  return (
    <>
      {isNotStarted && <AirState className='rs-state'>The airdrop has not yet started</AirState>}
      {isOver && <AirState className='rs-state'>{TranslateString(1278, 'The activity ended.')}</AirState>}
      {!isOver && !isNotStarted && <>
        <AirCountDown>
          <p className='title'>Countdown</p>
          <div className='time_down'>
            <p className='time_item'>
              <span>{data.hourseOne}</span>
              <span>{data.hourseTwo}</span>
            </p>
            <p className='m-h'>:</p>
            <p className='time_item'>
              <span>{data.miniteOne}</span>
              <span>{data.miniteTwo}</span>
            </p>
            <p className='m-h'>:</p>
            <p className='time_item'>
              <span>{data.secondOne}</span>
              <span>{data.secondTwo}</span>
            </p>
          </div>
        </AirCountDown>
      </>}
    </>
  )
}

export default CountDown
