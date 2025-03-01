import "./App.css";
import React, { useState, useEffect, createContext, useContext } from "react";
import confetti from "canvas-confetti";
import AlertComponent from "./assets/components/AlertComponent";
import { Button, TextField } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useFetchData from "./assets/utilities/useFetchdata";

const UserContext = createContext();

const App = () => {
  return (
    <UserProvider>
      <Game />
    </UserProvider>
  );
};

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  return (
    <UserContext.Provider value={{ username, setUsername, isGameStarted, setIsGameStarted }}>
      {children}
    </UserContext.Provider>
  );
};

const Game = () => {
  const { username, setUsername, isGameStarted, setIsGameStarted } = useContext(UserContext);
  const { data: dataset, loading, error } = useFetchData(
    "https://run.mocky.io/v3/c028de19-26e2-4b0f-b438-661c07967f84"
  );
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifType, setNotifType] = useState("info");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  useEffect(() => {
    if (isGameStarted && dataset?.length > 0) {
      loadNewQuestion();
    }
  }, [dataset, isGameStarted]);

  useEffect(() => {
    if (isGameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.7 } });
    }
  }, [timeLeft, isGameStarted]);

  const loadNewQuestion = () => {
    if (!dataset || dataset.length === 0 || gameOver) return;
    const randomIndex = Math.floor(Math.random() * dataset.length);
    const newQuestion = dataset[randomIndex];
    setQuestion(newQuestion);
    setOptions(
      [
        ...dataset.filter((c) => c.city !== newQuestion.city).slice(0, 3),
        newQuestion,
      ].sort(() => Math.random() - 0.5)
    );
    setUserAnswer(null);
    setShowNotif(false);
    setButtonsDisabled(false);
  };

  const handleAnswer = (answer, event) => {
    setButtonsDisabled(true);
    setUserAnswer(answer);
    setTotalAttempts((prev) => prev + 1);
  
    const { top, left, width, height } = event.target.getBoundingClientRect();
    const x = (left + width / 2) / window.innerWidth;
    const y = (top + height / 2) / window.innerHeight;
  
    if (answer === question.city) {
      setScore((prev) => prev + 1);
      setNotifMessage(`🎉 Correct! ${question.fun_fact[0]}`);
      setNotifType("success");
  
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x, y }
      });
    } else {
      setWrongAnswers((prev) => prev + 1);
      setNotifMessage(`😢 Incorrect! ${question.fun_fact[1]}`);
      setNotifType("error");
    }
    setShowNotif(true);
  };
  

  if (!isGameStarted) {
    return (
      <div className="flex flex-col items-center p-10">
        <h1 className="text-2xl font-bold mb-4">Enter your username</h1>
        <div className="flex gap-4">
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => username && setIsGameStarted(true)}
          >
            Start
          </Button>
        </div>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
      <p className="text-lg">Time Left: {timeLeft}s</p>
      {showNotif && <AlertComponent message={notifMessage} type={notifType} />}
      {gameOver ? (
        <>
           <h2 className="text-xl font-bold">Game Over!</h2>
            <p className="text-lg">Final Score: {score}</p>
            <p className="text-lg">Total Questions Attempted: {totalAttempts}</p>
            <p className="text-lg">Wrong Answers: {wrongAnswers}</p>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReplayIcon />}
              onClick={() => {
                setScore(0);
                setTimeLeft(30);
                setTotalAttempts(0);
                setWrongAnswers(0);
                setGameOver(false);
                loadNewQuestion();
              }}
            >
      Play Again
    </Button>
        </>
      ) : (
        question && (
          <>
            <p className="text-lg mb-8">{question.clues[0]}</p>
            <div className="flex gap-4 mb-8">
              {options.map((cityObj) => (
                <Button
                  key={cityObj.city}
                  variant="contained"
                  color="primary"
                  disabled={buttonsDisabled}
                  onClick={(e) => handleAnswer(cityObj.city, e)}
                >
                  {cityObj.city}
                </Button>
              ))}
            </div>
            <Button
              variant="contained"
              color="success"
              startIcon={<NavigateNextIcon />}
              onClick={loadNewQuestion}
              disabled={gameOver}
            >
              Next
            </Button>
            <p className="mt-8 text-lg">Score: {score}</p>
          </>
        )
      )}
    </div>
  );
};

export default App;
export {UserProvider}
