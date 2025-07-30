function NewButton({onClick,isAnswer,questionIndex,numOfQuestions}){
    
    if(isAnswer===null) return null;
    return (
        questionIndex<numOfQuestions-1?
        <button 
         onClick={()=>onClick({type:"nextQuestion"})}
         className="btn btn-ui">
            Next
        </button>
        :
        <button 
         onClick={()=>onClick({type:"finishQuiz"})}
         className="btn btn-ui">
            Finish
        </button>
    )
}
export default NewButton;