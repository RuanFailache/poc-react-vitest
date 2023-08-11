import { act, fireEvent, render, screen } from "@testing-library/react";

import Home from ".";

import {
  HOUR_IN_MS,
  MINUTE_IN_MS,
  SECOND_IN_MS,
} from "../../../resources/constants/time.ts";

vi.useFakeTimers();

describe("HomeScreen", () => {
  test("Should init with buttons with correct states", () => {
    render(<Home />);

    expect(screen.getByText("Iniciar")).not.toBeDisabled();
    expect(screen.getByText("Pausar")).toBeDisabled();
    expect(screen.getByText("Reiniciar")).toBeDisabled();
  });

  test("Should update button states correctly on click at 'Iniciar' button", () => {
    render(<Home />);

    act(() => {
      fireEvent.click(screen.getByText("Iniciar"));
      vi.advanceTimersByTime(HOUR_IN_MS);
    });

    expect(screen.getByText("Iniciar")).toBeDisabled();
    expect(screen.getByText("Pausar")).not.toBeDisabled();
    expect(screen.getByText("Reiniciar")).not.toBeDisabled();
  });

  test("Should update button states correctly on click at 'Pausar' button", () => {
    render(<Home />);

    act(() => {
      fireEvent.click(screen.getByText("Iniciar"));
      vi.advanceTimersByTime(HOUR_IN_MS);
    });

    act(() => {
      fireEvent.click(screen.getByText("Pausar"));
      vi.advanceTimersByTime(SECOND_IN_MS);
    });

    expect(screen.getByText("Iniciar")).not.toBeDisabled();
    expect(screen.getByText("Pausar")).toBeDisabled();
    expect(screen.getByText("Reiniciar")).not.toBeDisabled();
  });

  test("Should update button states correctly on click at 'Reiniciar' button", () => {
    render(<Home />);

    act(() => {
      fireEvent.click(screen.getByText("Iniciar"));
      vi.advanceTimersByTime(HOUR_IN_MS);
    });

    act(() => {
      fireEvent.click(screen.getByText("Reiniciar"));
      vi.advanceTimersByTime(MINUTE_IN_MS);
    });

    expect(screen.getByText("Iniciar")).not.toBeDisabled();
    expect(screen.getByText("Pausar")).toBeDisabled();
    expect(screen.getByText("Reiniciar")).not.toBeDisabled();
  });
});
