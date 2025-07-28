import React from "react";
import Options from "./Options"
function Questions({question, onAnswer,answer}) {
    
    return(
          <div >
            <h4>{question.question}</h4>
             <Options onAnswer={onAnswer} answer={answer} question={question}/>
          </div>
          
    )
       
    
}
export default Questions;