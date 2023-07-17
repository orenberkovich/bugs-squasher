import { createContext, useEffect, useState } from "react";
import { config } from "../configuration";

export type BugsContextType = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>
  gameOver: boolean;
  setGameoOver: (data: boolean) => void;
  gameTime: number;
  setGameTime: (time: number) => void;
};

export const BugsContext = createContext<BugsContextType | null>(null);

interface BugsContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const BugsContextProvider = ({ children }: BugsContextProviderProps) => {
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameoOver] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(0);

  useEffect(() => {
    if (score === config.numberOfBugs) {
      setGameoOver(true);
    }
  }, [score]);

  return (
    <BugsContext.Provider
      value={{
        score,
        setScore,
        gameOver,
        setGameoOver,
        gameTime,
        setGameTime,
      }}
    >
      {children}
    </BugsContext.Provider>
  );
};
