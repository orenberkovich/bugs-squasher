import { useEffect, useState, useMemo, useRef, useContext } from "react";
import { BugsContext, BugsContextType } from "../utils/BugsContext";
import { config } from "../configuration";
import gif from "../utils/giphy.gif";

interface BouncyProps {
  xValue: number;
  yValue: number;
  rootRef: React.RefObject<HTMLDivElement> | null;
}

const angleMap = {
  up: "0deg",
  right: "90deg",
  down: "180deg",
  left: "260deg",
};

const Bug = ({ xValue, yValue, rootRef }: BouncyProps) => {
  const { setScore } = useContext(BugsContext) as BugsContextType;
  const [xy_val, setXY_val] = useState({ x: xValue, y: yValue });
  const myref = useRef<HTMLImageElement>(null);
  const [lastXCoeff, setLastXCoeff] = useState<number>(
    Math.random() < 0.5 ? -1 : Math.floor(Math.random() * 3) + 1
  );
  const [lastYCoeff, setLastYCoeff] = useState<number>(
    Math.random() < 0.5 ? -1 : Math.floor(Math.random() * 3) + 1
  );

  const angleDiraction = lastXCoeff < 0 ? angleMap.left : angleMap.right;
  const [angle, setAngle] = useState<string>(angleDiraction);

  useEffect(() => {
    const interval = setInterval(() => {
      let x = xy_val.x + lastXCoeff * config.speed;
      if (x + config.bugImgSize > rootRef!.current!.offsetWidth || x <= 0) {
        setLastXCoeff(-lastXCoeff);
        const angleDiraction = lastXCoeff > 0 ? angleMap.left : angleMap.right;
        setAngle(angleDiraction);
        x = xy_val.x + lastXCoeff * config.speed;
      }

      let y = xy_val.y + lastYCoeff * config.speed;
      if (y + config.bugImgSize > rootRef!.current!.offsetHeight || y <= 0) {
        setLastYCoeff(-lastYCoeff);
        const angleDiraction = lastYCoeff > 0 ? angleMap.up : angleMap.down;
        setAngle(angleDiraction);
        y = xy_val.y + lastYCoeff * config.speed;
      }

      setXY_val({ x, y });
    }, 50);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xy_val]);

  const spanStyle = useMemo(() => {
    return {
      transform: `translate(${xy_val.x}px,${xy_val.y}px) rotate(${angle})`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xy_val]);

  const handleClick = () => {
    setScore((prev: number) => prev + 1);
    myref!.current!.remove();
  };

  return (
    <img
      src={gif}
      alt="bug"
      onClick={handleClick}
      className="bug"
      style={spanStyle}
      ref={myref}
    />
  );
};

export default Bug;
