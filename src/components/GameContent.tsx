import { useRef, useState, useEffect, useContext } from "react";
import { BugsContext, BugsContextType } from "../utils/BugsContext";
import Bug from "./Bug";
import { config } from "../configuration";
import GameOver from "./GameOver";

const GameContent = () => {
  const rootRef = useRef<HTMLInputElement>(null);
  const { numberOfBugs } = config;
  const [array, setArray] = useState<number[] | []>([]);
  const { gameOver } = useContext(BugsContext) as BugsContextType;

  useEffect(() => {
    if (gameOver) {
      setArray([]);
    } else {
      let timeOut: ReturnType<typeof setTimeout>;
      for (let i = 0; i < numberOfBugs; i++) {
        timeOut = setTimeout(
          () => setArray((prevState: number[]) => [...prevState, i]),
          2000 * i
        );
      }
      return () => {
        clearTimeout(timeOut);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  return (
    <div className="container" ref={rootRef}>
      {!gameOver ? (
        <div>
          {array.map((elem: number) => {
            const xvallocation = Math.floor(
              Math.random() *
                (rootRef!.current!.offsetWidth - config.bugImgSize * 2 + 1) +
                config.bugImgSize
            );
            const yvallocation = Math.floor(
              Math.random() *
                (rootRef!.current!.offsetHeight - config.bugImgSize * 2 + 1) +
                config.bugImgSize
            );

            return (
              <Bug
                key={elem}
                xValue={xvallocation}
                yValue={yvallocation}
                rootRef={rootRef}
              />
            );
          })}
        </div>
      ) : (
        <GameOver />
      )}
    </div>
  );
};

export default GameContent;
