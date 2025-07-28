
import Error from "./components/Loader"
import Main from "./components/Main"
import Header  from "./components/Header"
import StartScreen  from "./components/StartScreen"
import Loader from "./components/Loader"
import Questions from "./components/Questions"


// import "./App.css"
import { useEffect, useReducer } from "react"

const initialState={
  questions:[],
  status: "loading", //Loading, error,ready, active, finished
  questionIndex:0,
  answer:null
}
function reducer(state,action){
  switch (action.type) {
    case "dataRecieved": return{
      ...state,
      questions:action.payload,
      status:"ready"
    }
    case "error":return{
      ...state, status:"error"
    }
    case "startQuiz": return{
      ...state,
      status:"active",
    }
    case "newAnswer":return{
      ...state,
      answer:action.payload,
    }
  
    default:
      break;
  }
}

function App() {
  const [ {questions,status, questionIndex, answer}, dispatch]=useReducer(reducer, initialState)
const numOfQuestions=questions.length

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
    
    <div className="app">
      <Header/>
      <main className="main">
         <main>
          {status==="loading"&& <Loader/>}
          {status==="error"&&<Error/>}
          {status==="ready" && <StartScreen numOfQuestions={numOfQuestions} onStartQuiz={dispatch}/>}
          {status ==="active"&& <Questions question={questions[questionIndex]} onAnswer={dispatch} answer={answer}/>}
         </main>
         
      </main>
    </div>
  )
}

export default App
