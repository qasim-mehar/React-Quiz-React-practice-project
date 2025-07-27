
import Error from "./components/Loader"
import Main from "./components/Main"
import Header  from "./components/Header"
import StartScreen  from "./components/StartScreen"
import Loader from "./components/Loader"


// import "./App.css"
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
  const [ {quetions,status}, dispatch]=useReducer(reducer, initialState)
const numOfQuestions=quetions.length

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
          {status==="ready" && <StartScreen numOfQuestions={numOfQuestions}/>}
         </main>
         
      </main>
    </div>
  )
}

export default App
