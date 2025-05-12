import { useGame } from "./GameContext";
import Start from "./Start";
import Scoreboard from "./Scoreboard";
import HoleGrid from "./HoleGrid";

export default function Game() {
  const { isStarted, isCounting } = useGame();

  if (!isStarted && !isCounting()) {
    return <Start />;
  }

  return (
    <section id="game">
      {!isStarted && !isCounting ? (
        <Start />
      ) : (
        <>
          <Scoreboard />
          <HoleGrid />
        </>
      )}
    </section>
  );
}
