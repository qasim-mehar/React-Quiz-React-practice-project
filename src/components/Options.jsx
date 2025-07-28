function Options({question,onAnswer,answer}){
    const hasAnswer= answer!==null;
    return(
        <div className="options">
             {question.options.map((option, i)=>
             <button 
                key={option}
                onClick={()=>onAnswer({type:"newAnswer", payload:i })}
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