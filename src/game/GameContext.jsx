import { createContext, useContext, useState, useRef } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [currentMole, setCurrentMole] = useState(null); // 0 - 8
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const startCountdown = () => {
    console.log("Starting countdown.");

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 0) {
          startGame();
          return 0;
        }
        console.log("- Countdown: ", previous);
        return previous - 1;
      });
    }, 1000);
  };

  const isCounting = () => {
    return countdownIntervalRef.current !== null;
  };

  const pickRandomMole = () => {
    setCurrentMole((previousHole) => {
      const newHole = Math.floor(Math.random() * 9);

      return newHole === previousHole ? pickRandomMole() : newHole;
    });
  };

  const startGame = () => {
    clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = null;

    pickRandomMole();
    setIsStarted(true);
    setCountdown(3);
    setTimeLeft(15);

    console.log("Game Starting:");

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          endGame();
          return 0;
        }
        console.log("- Time Left: ", prev);
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    console.log("Ending Game");

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setCurrentMole(-1);
    setTimeLeft(15);
    setCountdown(3);
    setScore(0);
    setIsStarted(false);
  };

  const whackMole = (index) => {
    if (index !== currentMole) {
      return;
    }
    setScore(score + 1);
    pickRandomMole();
  };

  const grid = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };

  const value = {
    score,
    isStarted,
    currentMole,
    countdown,
    timeLeft,
    isCounting,
    pickRandomMole,
    startCountdown,
    startGame,
    endGame,
    whackMole,
    grid,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw Error("useGame msut be used within a CartContext Provider.");
  }

  return context;
}
