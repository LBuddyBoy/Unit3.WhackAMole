import { useGame } from "./GameContext";
import Hole from "./Hole";

export default function HoleGrid() {
  const { isCounting, grid } = useGame();

  return (
    <section id="holes">
      {!isCounting() &&
        grid().map((index) => {
          return <Hole key={index} index={index} />;
        })}
    </section>
  );
}
