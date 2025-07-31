


// import "./App.css"
import { useEffect, useReducer } from "react"
import FinishScreen from "./components/FinishScreen"
import Error from "./components/Loader"
import Main from "./components/Main"
import Header  from "./components/Header"
import StartScreen  from "./components/StartScreen"
import Loader from "./components/Loader"
import Questions from "./components/Questions"
import NewButton from "./components/NewButton"
import ProgressBar from "./components/ProgressBar"
import Footer from "./components/Footer"
import Timer from "./components/Timer"

const initialState={
  questions:[],
  status: "loading", //Loading, error,ready, active, finished
  questionIndex:0,
  answer:null,
  points:0,
  highestScore:0,
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
    case "newAnswer":{
      const question=state.questions.at(state.questionIndex)
      const isCorrect= question.correctOption===action.payload;
      return{
      ...state,
      answer:action.payload,
      points:isCorrect?state.points+question.points:state.points,
    }}
    case "nextQuestion":
      return{
        ...state,
        questionIndex:state.questionIndex+1,
       answer:null,
      }
      case "finishQuiz":
            return{
            ...state,
            status:"finished",
            highestScore:state.points>state.highestScore?state.points:state.highestScore
          }
      case "restartQuiz": 
           return{
            ...state,
            questionIndex:0,
            points:0,
            status:"active",
            answer:null,
           }
    default:
      break;
  }
}

function App() {
  const [ {questions,status, questionIndex, answer,points, highestScore}, dispatch]=useReducer(reducer, initialState)
const numOfQuestions=questions.length;
const totaPoints=questions?.reduce((prev,cur) => prev+cur.points,0);
// console.log(totaPoints);



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
          {status ==="active"&& (
          <>
          <ProgressBar 
          questionIndex={questionIndex}
          numOfQuestions={numOfQuestions} 
          points={points}
          totalPoints={totaPoints}
          answer={answer}/>
          <Questions question={questions[questionIndex]} onAnswer={dispatch} answer={answer}/>
          <Footer>
            <Timer/>
            <NewButton 
          onClick={dispatch}
          isAnswer={answer} 
          questionIndex={questionIndex} 
          numOfQuestions={numOfQuestions}/> 
          </Footer>
          </>)}
          {status==="finished"&& <FinishScreen dispatch={dispatch} highestScore={highestScore}  points={points} totalPoints={totaPoints}/>}
       </main>
         
      </main>
    </div>
  )
}

export default App
