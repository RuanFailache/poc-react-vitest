import { useEffect, useState } from "react";
import { ITimer } from "../../../domain/entities/Timer.ts";
import { SECOND_IN_MS } from "../../../resources/constants/time.ts";

export default function useTimer() {
  const [timer, setTimer] = useState<ITimer>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const [isPaused, setIsPaused] = useState(true);

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (isPaused) clearInterval(intervalId);
  }, [intervalId, isPaused]);

  return {
    timer,

    isPaused,

    isStarted: Object.values(timer).some((timeSlot) => timeSlot > 0),

    onStartTimer: () => {
      setIsPaused(false);
      setIntervalId(
        setInterval(
          () =>
            setTimer((prevState) => {
              if (prevState.seconds === 59 && prevState.minutes === 59) {
                return {
                  seconds: 0,
                  minutes: 0,
                  hours: prevState.hours + 1,
                };
              }
              if (prevState.seconds === 59) {
                return {
                  ...prevState,
                  seconds: 0,
                  minutes: prevState.minutes + 1,
                };
              }
              return {
                ...prevState,
                seconds: prevState.seconds + 1,
              };
            }),
          SECOND_IN_MS,
        ),
      );
    },

    onPauseTimer: () => setIsPaused(true),

    onResetTimer: () => {
      setIsPaused(true);
      setTimer({
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    },
  };
}
