import React,{useEffect, useState,useCallback} from 'react';

import styled from 'styled-components';
const AirState = styled.div`
    text-align:center;
    margin:46px 0;
    font-size:20px;
    color:#8E8F99;
`

const AirCountDown = styled.div`
    .title{
        text-align:center;
        font-size:16px;
        color:#8E8F99;
        margin:30px 0 18px;
    }
    .time_down{
        display:flex;
        justify-content:center;
        align-items:center;
        padding: 0 5px;
        //flex-wrap: nowrap;
    }
    .time_item{
        display: flex;
        text-align:center;
        span{
            display:inline-block;
            width:40px;
            height:40px;
            background-color:#f5b0ba;
            font-size:22px;
            color:#E55268;
            line-height:42px;
            border-radius: 11px;
            box-shadow: 0px 2px 30px 0px rgba(232,217,219,0.51); 
            margin-right:10px;
            &:last-child{
                margin-right:0;
            }
        }
    }
    .m-h{
        color:#E55268;
        font-size:40px;
        margin:-7px 8px 0;
    }
`

const CountDown = ({setIsStart}) => {
    const [isOver,setIsOver] = useState(false);
    const [isNotStarted,setIsNotStarted] = useState(true);

    const [data,setData] = useState({
        hourseOne:"0",
        hourseTwo:"0",
        miniteOne:"0",
        miniteTwo:"0",
        secondOne:"0",
        secondTwo:"0"
    });

    const countFun = useCallback((time,stamptimes) => {
        const startTime = new Date(time).getTime();
        const endTime = startTime + 24*60*1000;
        // const endTime = startTime + 10*60*1000;
        const nowTime = stamptimes;
        if(nowTime < startTime ){
            console.log()
            setIsOver(false);
            setIsNotStarted(true)
            setIsStart(1)
            setTimeout(()=>{
                stamptimes+=1000
                countFun(time,stamptimes)
            },1000)
        }else if(nowTime > endTime){
            setIsOver(true);
            setIsNotStarted(false)
            setIsStart(2)
        }else{
            setIsOver(false);
            setIsStart(3)
            setIsNotStarted(false)
            const lefttime = endTime - nowTime ;
            const lefth = Math.floor(lefttime/(1000*60*60)%24)
            const leftm = Math.floor(lefttime/(1000*60)%60)
            const lefts = Math.floor(lefttime/1000%60);
            setData({
                hourseOne:lefth.toString().length === 1 ? "0" : lefth.toString().substring(0,1),
                hourseTwo:lefth.toString().length === 1 ? lefth.toString().substring(0,1) : lefth.toString().substring(1,2),
                miniteOne:leftm.toString().length === 1 ? "0" : leftm.toString().substring(0,1),
                miniteTwo:leftm.toString().length === 1 ? leftm.toString().substring(0,1) : leftm.toString().substring(1,2),
                secondOne:lefts.toString().length === 1 ? "0" : lefts.toString().substring(0,1),
                secondTwo:lefts.toString().length === 1 ? lefts.toString().substring(0,1) : lefts.toString().substring(1,2),
            })
            setTimeout(()=>{
                stamptimes+=1000
                countFun(time,stamptimes)
            },1000)
        }
      },[setData,setIsOver,setIsNotStarted,setIsStart]);
      useEffect(()=>{

        // const BASEURL = 'http://47.57.4.177:89'
        const BASEURL = 'https://www.cherryswap.net'
        // const BASEURL = 'http://127.0.0.1:7001'
        const url = `${BASEURL}/api/nowTime`
        fetch(url,{
            method:'GET'
        }).then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.code === 200){

            const start = new Date(1616254200000)
            const apiNow =  data.data

            countFun(start, apiNow)
            // countFun('2021/3/20 23:30:00',data.data)
          }
        })
    },[countFun])

    return (
        <>
            {isNotStarted && <AirState className="rs-state">The airdrop has not yet started</AirState>}
            {isOver && <AirState className="rs-state">The activity ended.</AirState>}
            {!isOver && !isNotStarted && <>
            <AirCountDown>
                <p className="title">Countdown</p>
                <div className="time_down">
                    <p className="time_item">
                        <span>{data.hourseOne}</span>
                        <span>{data.hourseTwo}</span>
                    </p>
                    <p className="m-h">:</p>
                    <p className="time_item">
                        <span>{data.miniteOne}</span>
                        <span>{data.miniteTwo}</span>
                    </p>
                    <p className="m-h">:</p>
                    <p className="time_item">
                        <span>{data.secondOne}</span>
                        <span>{data.secondTwo}</span>
                    </p>
                </div>
            </AirCountDown>
            </>}
        </>
    )
}

export default CountDown;
