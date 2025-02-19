import { useEffect, useState } from "react";
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

  //user choices state
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };

  //Handling of user choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //State changes
  //Comparing the two selected cards using useEffect hook
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      //Disable other cards if two cards are selected
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        //Set the matched property to true
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Start the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if user won the game
  useEffect(() => {
    if (cards.length > 0) {
      let isGameFinished = cards.every((card) => card.matched === true);
      if (isGameFinished) {
        setTimeout(() => setShowModal(true), 800);
      }
    }
  }, [cards]);

  return (
    <div className="App">
      <h1>Magic Memory Game</h1>
      <button className="new-game-btn" onClick={shuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>No. of turns: {turns}</p>
      <footer>Made by dave.visual (from a Holy Cross of Davao College)</footer>

      {showModal && <Modal handleClose={handleCloseModal} />}
    </div>
  );
}

export default App;
