// import { useQuiz } from "../contexts/QuizContext";

function StartScreen({numOfQuestions,onStartQuiz}) {
  // const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={()=>onStartQuiz({type:"startQuiz"})}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
