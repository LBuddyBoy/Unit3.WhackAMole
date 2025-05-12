import { useGame } from "./GameContext";

export default function Hole({ index }) {
  const { currentMole, whackMole } = useGame();

  return (
    <button
      className={index === currentMole ? "mole" : "hole"}
      onClick={() => {
        whackMole(index);
      }}
    ></button>
  );
}
