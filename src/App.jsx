// import { useState } from 'react'
import Main from "./main"
import Header from "./Header"
import "./App.css"
import { useEffect, useReducer } from "react"
const initialState={
  quetions:[],
  status: "loading" //Loading, error,ready, active, finished
}
function reducer(state,action){
  switch (action.type) {
    case "dataRecieved": return{
      ...state,
      quetions:action.payload,
      status:"ready"
    }
    case "error":return{
      ...state, status:"error"
    }
  
    default:
      break;
  }
}

function App() {
  const [state, dispatch]=useReducer(reducer, initialState)
  useEffect(function(){
    async function getQuestion() {
    
        fetch("http://localhost:8000/questions")
        .then(res=>res.json())
        .then(data=>dispatch({type:"dataRecieved", payload:data}))
        .catch(dispatch({type:"error"}))
    }
    
    getQuestion();
  },[])
  return(
    
    <div>
      <Header/>
      <main className="main">
         <main>
          <p>1/15</p>
          <p>Quesion </p>
         </main>
         
      </main>
    </div>
  )
}

export default App
