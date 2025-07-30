function FinishScreen({points,totalPoints}) {
    const percentage = Math.ceil((points / totalPoints) * 100);
let emoji;

if (percentage <= 40) {
  emoji = "💩";
} else if (percentage <= 50) {
  emoji = "😕";
} else if (percentage <= 60) {
  emoji = "🙂";
} else if (percentage <= 70) {
  emoji = "😎";
} else if (percentage <= 85) {
  emoji = "🤩";
} else if (percentage <= 95) {
  emoji = "🔥";
} else {
  emoji = "🧠";
}

    return(
        <p className="result"> You have scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percentage)}%) {emoji}</p>
    )
}
export default FinishScreen;