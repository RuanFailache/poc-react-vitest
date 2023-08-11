import { act, renderHook } from "@testing-library/react";

import useTimer from ".";

import {
  HOUR_IN_MS,
  MINUTE_IN_MS,
  SECOND_IN_MS,
} from "../../../resources/constants/time.ts";

vi.useFakeTimers();

describe("useTimer", () => {
  test("should start with correct initial values", async () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.timer.seconds).toBe(0);
    expect(result.current.timer.minutes).toBe(0);
    expect(result.current.timer.hours).toBe(0);

    expect(result.current.isPaused).toBeTruthy();
    expect(result.current.isStarted).toBeFalsy();
  });

  describe("onStartTimer", () => {
    test("should indicate that the timer started", () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.onStartTimer();
        vi.advanceTimersByTime(SECOND_IN_MS);
      });

      expect(result.current.isStarted).toBeTruthy();
    });

    test("should increment seconds correctly", () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.onStartTimer();
        vi.advanceTimersByTime(SECOND_IN_MS);
      });

      expect(result.current.timer.seconds).toBe(1);

      act(() => vi.advanceTimersByTime(SECOND_IN_MS));

      expect(result.current.timer.seconds).toBe(2);
    });

    test("should increment minutes correctly", async () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.onStartTimer();
        vi.advanceTimersByTime(MINUTE_IN_MS);
      });

      expect(result.current.timer.seconds).toBe(0);
      expect(result.current.timer.minutes).toBe(1);
    });

    test("should increment hours correctly", async () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.onStartTimer();
        vi.advanceTimersByTime(HOUR_IN_MS);
      });

      expect(result.current.timer.seconds).toBe(0);
      expect(result.current.timer.minutes).toBe(0);
      expect(result.current.timer.hours).toBe(1);
    });
  });

  describe("onPauseTimer", () => {
    test("should pause timer correctly", async () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.onStartTimer();
        vi.advanceTimersByTime(SECOND_IN_MS);
      });

      act(() => {
        result.current.onPauseTimer();
        vi.advanceTimersByTime(HOUR_IN_MS);
      });

      expect(result.current.isPaused).toBeTruthy();
      expect(result.current.timer.seconds).toBe(1);
    });
  });

  describe("onResetTimer", () => {
    test("should reset timer correctly", async () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.onStartTimer();
        vi.advanceTimersByTime(HOUR_IN_MS);
      });

      act(() => result.current.onResetTimer());

      expect(result.current.isPaused).toBeTruthy();
      expect(result.current.isStarted).toBeFalsy();
    });
  });
});
