// import { useQuiz } from "../contexts/QuizContext";

import { useQuiz } from "../Contexts/QuizContext";

function StartScreen() {
  const {numOfQuestions,dispatch}= useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={()=>dispatch({type:"startQuiz"})}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
