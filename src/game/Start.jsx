import { useGame } from "./GameContext";

export default function Start() {
  const { startCountdown } = useGame();

  return (
    <>
      <p>
        Welcome to Whack a Mole! Whack a mole to earn points and see how many
        you can get. Click play to get begin!
      </p>
      <button onClick={() => {
        startCountdown();
      }}>Play</button>
    </>
  );
}
