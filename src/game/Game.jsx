import { useGame } from "./GameContext";
import Start from "./Start";
import Hole from "./Hole";

export default function Game() {
  const { isStarted, isCounting, grid, countdown, score, timeLeft, endGame } =
    useGame();

  if (!isStarted && !isCounting()) {
    return <Start />;
  }

  return (
    <section id="game">
      {!isStarted && !isCounting ? (
        <Start />
      ) : (
        <>
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
          <section id="holes">
            {!isCounting() &&
              grid().map((index) => {
                return <Hole key={index} index={index} />;
              })}
          </section>
        </>
      )}
    </section>
  );
}
