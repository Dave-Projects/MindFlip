import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Modal from "./components/Modal";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/monsters.png", matched: false },
  { src: "/img/monsters2.png", matched: false },
  { src: "/img/monsters3.png", matched: false },
  { src: "/img/monsters4.png", matched: false },
  { src: "/img/monsters5.png", matched: false },
  { src: "/img/monsters6.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Initialize Game
  const initializeGame = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setShowModal(false);
  }, []);

  // Handle user card selection
  const selectCard = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset choices and increment turn count
  const nextTurn = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  }, []);

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        nextTurn();
      } else {
        setTimeout(() => nextTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, nextTurn]);

  // Start game on first render
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setTimeout(() => setShowModal(true), 800);
    }
  }, [cards]);

  return (
    <div className="App">
      <h1>Magic Memory Game</h1>
      <button className="new-game-btn" onClick={initializeGame}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={selectCard}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>No. of turns: {turns}</p>
      <footer>Made by dave.visual (from Holy Cross of Davao College)</footer>

      {showModal && <Modal handleClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
