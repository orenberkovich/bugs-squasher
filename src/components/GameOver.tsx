import { useContext } from "react";
import { BugsContext, BugsContextType } from "../utils/BugsContext";

const GameOver = () => {
  const { score, gameTime, setGameoOver } = useContext(
    BugsContext
  ) as BugsContextType;
  return (
    <div className="gameOverContainer">
      <h1>game over</h1>
      <h2>your score is: {score}</h2>
      <h2>time left: {gameTime} sec</h2>
      <button className="btn" onClick={() => setGameoOver(false)}>
        Start Again
      </button>
    </div>
  );
};

export default GameOver;
