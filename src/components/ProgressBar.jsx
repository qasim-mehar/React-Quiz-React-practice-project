import { useQuiz } from "../Contexts/QuizContext";

function ProgressBar() {
    const {questionIndex,numOfQuestions,points,answer,totalPoints}=useQuiz()
    //   const totalPoints=questions?.reduce((prev,cur) => prev+cur.points,0);
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