


// import "./App.css"
import { useEffect } from "react"
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
import { useQuiz } from "./Contexts/QuizContext"

// const initialState={
//   questions:[],
//   status: "loading", //Loading, error,ready, active, finished
//   questionIndex:0,
//   answer:null,
//   points:0,
//   highestScore:0,
//   secondsRemaining:null,
// }
// const SEC_PER_QUESTION=30;
// function reducer(state,action){
//   switch (action.type) {
//     case "dataRecieved": return{
//       ...state,
//       questions:action.payload,
//       status:"ready"
//     }
//     case "error":return{
//       ...state, status:"error"
//     }
//     case "startQuiz": return{
//       ...state,
//       status:"active",
//       secondsRemaining:state.questions.length * SEC_PER_QUESTION,
//     }
//     case "newAnswer":{
//       const question=state.questions.at(state.questionIndex)
//       const isCorrect= question.correctOption===action.payload;
//       return{
//       ...state,
//       answer:action.payload,
//       points:isCorrect?state.points+question.points:state.points,
//     }}
//     case "nextQuestion":
//       return{
//         ...state,
//         questionIndex:state.questionIndex+1,
//        answer:null,
//       }
//       case "finishQuiz":
//             return{
//             ...state,
//             status:"finished",
//             highestScore:state.points>state.highestScore?state.points:state.highestScore
//           }
//       case "restartQuiz": 
//            return{
//             ...state,
//             questionIndex:0,
//             points:0,
//             status:"active",
//             answer:null,
//             secondsRemaining:10,
//            }
//      case "timer":
//       return{
//         ...state,
//         secondsRemaining:state.secondsRemaining-1,
//         status:state.secondsRemaining>0?"active":"finished",

//       }
//     default:
//       break;
//   }
// }

function App() {
  const {status,dispatch}=useQuiz()

// console.log(totaPoints);



  useEffect(function(){
     async function getQuestion() {
      fetch("https://my-json-server.typicode.com/qasim-mehar/Questions-API-for-ReactJs-Quiz-App/questions")
        .then(res=>res.json())
        .then(data=>dispatch({type:"dataRecieved", payload:data}))
        .catch(dispatch({type:"error"}))
    }
    
    getQuestion();
  },[])
  return(
    
    <div className="app">
      <Header/>
      <Main className="main">
         <Main>
          {status==="loading"&& <Loader/>}
          {status==="error"&&<Error/>}
          {status==="ready" && <StartScreen />}
          {status ==="active"&& (
          <>
          <ProgressBar />
          <Questions />
          <Footer>
            <Timer />
            <NewButton /> 
          </Footer>
          </>)}
          {status==="finished"&& <FinishScreen />}
       </Main>
         
      </Main>
    </div>
  )
}

export default App
