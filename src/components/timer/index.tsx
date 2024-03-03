import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const Timer = forwardRef(function TimerComponent(props, _ref) {
  const [timer, setTimer] = useState(0);
  const tick = useRef<NodeJS.Timeout>();

  // console.log(">>> timer", timer);

  const start = () => {
    setTimer(0);
    clearInterval(tick.current);

    tick.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  useImperativeHandle(_ref, () => ({
    reset: () => {
      start();
    },
    stop: () => {
      clearInterval(tick.current);
    }
  }), []);

  useEffect(() => {
    start();

    return () => clearInterval(tick.current);
  }, []);

  return (
    <span>
      {new Date(timer * 1000).toISOString().slice(11, 19)}
    </span>
  )
});

export default Timer;
