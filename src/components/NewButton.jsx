import { useQuiz } from "../Contexts/QuizContext";

function NewButton(){
    const {dispatch,answer,questionIndex,numOfQuestions}=useQuiz()
    
    if(answer===null) return null;
    return (
        questionIndex<numOfQuestions-1?
        <button 
         onClick={()=>dispatch({type:"nextQuestion"})}
         className="btn btn-ui">
            Next
        </button>
        :
        <button 
         onClick={()=>dispatch({type:"finishQuiz"})}
         className="btn btn-ui">
            Finish
        </button>
    )
}
export default NewButton;