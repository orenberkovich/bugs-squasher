import { useContext, useEffect, useRef } from "react";
import { BugsContext, BugsContextType } from "../utils/BugsContext";
import Countdown from "react-countdown";
import { config } from "../configuration";

interface RendererProps {
  minutes: number;
  seconds: number;
  completed: boolean;
}

const date = Date.now();

const Header = () => {
  const { score, setScore, setGameoOver, gameOver, setGameTime } = useContext(
    BugsContext
  ) as BugsContextType;
  const countdownRef = useRef<any>(null);

  const renderer = ({ minutes, seconds, completed }: RendererProps) => {
    if (completed) {
      return <span>finished</span>;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    if (gameOver) {
      countdownRef.current.api.pause();
      setGameTime(countdownRef.current.state.timeDelta.seconds);
    } else {
      countdownRef.current.api.stop();
      countdownRef.current.api.start();
      setScore(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  return (
    <div className="headerContainer">
      <div>{`YOUR SCORE IS: ${score}`} </div>
      <div>
        {`Time: `}
        <Countdown
          ref={countdownRef}
          date={date + config.gameTime * 60000}
          renderer={renderer}
          onComplete={() => setGameoOver(true)}
        />
      </div>
    </div>
  );
};

export default Header;
