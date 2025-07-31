import { useEffect } from "react";

function Timer({dispatch, secondsRemaining}){
    useEffect(function(){
        const intervelId=setInterval(function(){
            dispatch({type:"timer"})
        },1000)
        //On every rerender a new timer a new interval gets added without removing the previous one. to remove it :
        return ()=>clearInterval(intervelId);
    },[dispatch])
    return(
        <div className="timer">{secondsRemaining}</div>
    )
}
export default Timer;