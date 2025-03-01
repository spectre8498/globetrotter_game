import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest"; 
import App from "../src/App"
import { UserProvider } from "../src/App";
import { vi } from "vitest";

vi.mock("canvas-confetti", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("App Component", () => {
  test("renders the username input and start button initially", () => {
    render(<App />);
    
    expect(screen.getByText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start/i })).toBeInTheDocument();
  });

  test("updates username input value", () => {
    render(<App />);
    
    const input = screen.getByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: "Player1" } });

    expect(input.value).toBe("Player1");
  });

  test("starts the game when clicking the start button with a valid username", () => {
    render(<App />);
    
    const input = screen.getByLabelText(/Username/i);
    const startButton = screen.getByRole("button", { name: /Start/i });

    fireEvent.change(input, { target: { value: "Player1" } });
    fireEvent.click(startButton);

    expect(screen.getByText(/Welcome, Player1!/i)).toBeInTheDocument();
  });
});

describe("Game Component", () => {
  test("displays the game UI when game starts", () => {
    render(
      <UserProvider>
        <App />
      </UserProvider>
    );

    const input = screen.getByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: "Player1" } });

    const startButton = screen.getByRole("button", { name: /Start/i });
    fireEvent.click(startButton);

    expect(screen.getByText(/Welcome, Player1!/i)).toBeInTheDocument();
    expect(screen.getByText(/Time Left:/i)).toBeInTheDocument();
  });

  test("shows loading text when data is being fetched", () => {
    render(
      <UserProvider>
        <App />
      </UserProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
