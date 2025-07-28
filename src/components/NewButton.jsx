function NewButton({onClick,isAnswer}){
    console.log(isAnswer)
    if(isAnswer===null) return null;
    return (
        <button onClick={()=>onClick({type:"nextQuestion"})} className="btn btn-ui">Next</button>
    )
}
export default NewButton;