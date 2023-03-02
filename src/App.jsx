import { Children, useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const valueType = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
  };

  const actions = [
    {
      value: 1,
      label: "👊🏽",
      description: "Rock",
    },
    {
      value: 2,
      label: "🖐🏽",
      description: "Paper",
    },
    {
      value: 3,
      label: "✌🏽",
      description: "Scissors",
    },
  ];

  const [username, setUsername] = useState("JOGADOR");
  const [playGame, setPlayGame] = useState(false);
  const [scorePlayerValue, setScorePlayerValue] = useState(0);
  const [scoreComputerValue, setScoreComputerValue] = useState(0);
  const [userAction, setUserAction] = useState("❓");
  const [computerAction, setComputerAction] = useState("❓");
  const [textGame, setTextGame] = useState("Inicio o jogo");
  const SCORE_TO_WIN = 10;

  const handleUsername = (e) => {
    if (!e.target.value) return setUsername("JOGADOR");
    setUsername(e.target.value);
  };
  const startGame = () => {
    if (username === "JOGADOR") {
      alert("Preencha o nome do jogador");
      return;
    } else {
      if (playGame) return resetValues();
      setPlayGame(!false);
    }
  };
  const resetValues = () => {
    setTextGame("Iniciar Jogo");
    setPlayGame(false);
    setScoreComputerValue(0);
    setScorePlayerValue(0);
    setUserAction("❓");
    setComputerAction("❓");
  };

  useEffect(() => {
    const checkVictory = () => {
      const playerWin = scorePlayerValue === SCORE_TO_WIN;
      const computerWin = scoreComputerValue === SCORE_TO_WIN;
      if (playerWin) {
        alert(`Você venceu ${username}`);
        return resetValues();
      }
      if (computerWin) {
        alert("Você perdeu, tente novamente !");
        resetValues();
      }
    };
    checkVictory();
  }, [scorePlayerValue, scoreComputerValue]);

  const randomActionComputer = () => {
    const number = Math.floor(Math.random() * actions.length);
    return actions[number];
  };
  const handleClick = (action) => {
    setUserAction(action.label);
    const actionComputer = randomActionComputer();
    setComputerAction(actionComputer.label);
    checkWinner(action.value, actionComputer.value);
  };
  const checkWinner = (playerValue, computerValue) => {
    const playerRockWin =
      playerValue === valueType.ROCK && computerValue === valueType.SCISSORS;

    const playerPapperWin =
      playerValue === valueType.PAPER && computerValue === valueType.ROCK;

    const playerScissorsWin =
      playerValue === valueType.SCISSORS && computerValue === valueType.PAPER;

    const drawerResult = playerValue === computerValue;

    const playerWin = playerRockWin || playerPapperWin || playerScissorsWin;

    if (drawerResult) return setTextGame("Empate");
    if (playerWin) {
      setScorePlayerValue((state) => state + 1);
      return setTextGame("Vitoria jogue novamente !");
    } else {
      setScoreComputerValue((state) => state + 1);
      return setTextGame("Derrota jogue novamente !");
    }
  };

  return (
    <div className="App">
      <div className="jokenpo">
        <h1>JO KEN PÔ</h1>
        <input
          onChange={(e) => handleUsername(e)}
          placeholder="Digite seu nome"
        />
        <div>
          <button onClick={startGame}>{playGame ? "Parar" : "Iniciar"}</button>
        </div>
      </div>
      <div className="placar-div">
        <h2>PLACAR</h2>

        <div className="placar">
          <div>
            <p>{username}</p>
            <p>{scorePlayerValue}</p>
          </div>
          <div>
            <p>X</p>
          </div>
          <div>
            <p>COMPUTADOR</p>
            <p>{scoreComputerValue}</p>
          </div>
        </div>
        <div className="escolha">
          <p>{userAction}</p>
          <p>{computerAction}</p>
        </div>
      </div>
      <div className="regras">
        <p className="inicio">{textGame}</p>
        <p>Regras</p>
      </div>
      <div className="jogo">
        {actions.map((action) => {
          return (
            <div>
              <button
                key={action.value}
                onClick={() => handleClick(action)}
                disabled={!playGame}
              >
                {action.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
