import { useQuiz } from "../Contexts/QuizContext";

function Options(){
    const {question,dispatch,answer}=useQuiz()
    const hasAnswer= answer!==null;

    return(
        <div className="options">
             {question.options.map((option, i)=>
             <button 
                key={option}
                onClick={()=>dispatch({type:"newAnswer", payload:i,})}
                className={`btn btn-option 
                ${answer===i ?"answer":""}
                ${hasAnswer ?
                    i===question.correctOption? "correct":"wrong"
                    :""}`}
                disabled={hasAnswer}>
                {option}
              </button>)}
          </div>
    )
}
export default Options;