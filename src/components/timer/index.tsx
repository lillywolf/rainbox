import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";

const Timer = forwardRef(function TimerComponent(props, _ref) {
  const [timer, setTimer] = useState(0);
  const tick = useRef<NodeJS.Timeout>();

  const start = useCallback(() => {
    setTimer(0);
    clearInterval(tick.current);

    tick.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 10);
  }, []);

  useImperativeHandle(_ref, () => ({
    reset: () => {
      setTimer(0);
    },
    start: () => {
      start();
    },
    stop: () => {
      clearInterval(tick.current);
    },
    getTime: () => {
      return timer;
    }
  }), [timer, start]);

  return (
    <span>
      {new Date(timer * 10).toISOString().slice(11, 22)}
    </span>
  )
});

export default Timer;
