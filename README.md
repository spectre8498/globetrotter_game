# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Description

This is a React-based game application where users can enter their username, start the game, and interact with a time-based game UI. 
The app maintains user state using UserProvider and includes unit tests to verify its functionality.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Features

Username Input: Users can enter their name before starting the game.

Game Start: The game begins when the user clicks the "Start" button.

Game UI: Once started, the game displays a timer and the username.

Loading State: Shows a "Loading..." message while fetching necessary data.

Confetti Effect: The app integrates canvas-confetti for celebratory effects.

User Context: Uses UserProvider to manage user state across components.

Unit Tests: Written using Vitest and @testing-library/react.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Technologies Used

React.js

Context API

React Testing Library

Vitest

Canvas Confetti (Mocked for testing)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Installation & Setup

1. Clone the repository:

git clone <repository-url>
cd <project-folder>

2. Install dependencies:

npm install

3. Run the development server:

npm run dev

The app should now be running on localhost.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Running Unit Tests

To execute the unit tests, run:

npm test

Unit Test Cases Implemented

App Component Tests

Checks if the username input and start button are displayed initially.

Verifies that the username input updates correctly.

Ensures that clicking the start button displays a welcome message with the username.

Game Component Tests

Ensures the game UI is displayed after the game starts.

Checks if the loading text appears while fetching data.

Mocking External Libraries

The canvas-confetti library is mocked to avoid actual confetti animations during testing.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Future Enhancements

Add more game mechanics.

Implement user authentication.

Store user scores and leaderboards.