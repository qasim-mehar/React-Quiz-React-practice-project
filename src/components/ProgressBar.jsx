function ProgressBar({questionIndex,numOfQuestions,points,totalPoints,answer}) {
    // console.log(totalPoints);
    
    return(
        <header className="progress">
            <progress max={numOfQuestions} value={questionIndex + Number(answer!==null)}/>
            <p> <strong>{questionIndex+1}</strong> / {numOfQuestions}</p>
            <p> <strong>{points}</strong> / {totalPoints}</p>
        </header>
    )
}
export default ProgressBar;