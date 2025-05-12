import { useGame } from "./GameContext";

export default function Scoreboard() {
  const { isCounting, countdown, score, timeLeft, endGame } = useGame();

  return (
    <section id="scoreboard">
      <span>Score: {score}</span>
      <span>Time Left: {timeLeft}</span>
      {isCounting() ? (
        <h1 id="countdown">Starting in {countdown}s</h1>
      ) : (
        <button id="restartButton" onClick={endGame}>
          Restart
        </button>
      )}
    </section>
  );
}
