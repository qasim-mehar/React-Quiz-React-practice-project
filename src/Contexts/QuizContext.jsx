import { createContext, useContext, useReducer } from "react";

const quizContext = createContext();

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  questionIndex: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  secondsRemaining: null,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "error":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.questionIndex);
      const isCorrect = question.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answer: null,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    case "restartQuiz":
      return {
        ...state,
        questionIndex: 0,
        points: 0,
        status: "active",
        answer: null,
        secondsRemaining: 10,
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining > 0 ? "active" : "finished",
      };
    default:
      return state;
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      questionIndex,
      answer,
      points,
      highestScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <quizContext.Provider
      value={{
        questions,
        status,
        questionIndex,
        answer,
        points,
        highestScore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </quizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(quizContext);
  if (context === undefined) {
    throw new Error("Quiz context is used outside of provider child");
  }
  return context;
}

export { QuizProvider, useQuiz };
