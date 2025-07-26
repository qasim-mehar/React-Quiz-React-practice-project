// import { useState } from 'react'
import Main from "./main"
import Header from "./Header"
import "./App.css"
import { useEffect } from "react"

function App() {
  useEffect(function(){
    async function getQuestion() {
      const res =await fetch("http://localhost:8000/questions");
      const data = await res.json()
      console.log(data);
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
