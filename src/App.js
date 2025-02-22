import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src:"/img/monsters.png", matched: false},
  { src:"/img/monsters2.png", matched: false},
  { src:"/img/monsters3.png", matched: false},
  { src:"/img/monsters4.png", matched: false},
  { src:"/img/monsters5.png", matched: false},
  { src:"/img/monsters6.png", matched: false},
];

//function 
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState([0])
  const [showModal, setShowModal] =   useState(false);

  //user choices state
  const [choiceOne, setChoiceOne] =  useState(null)
  const [choiceTwo, setChoiceTwo] =  useState(null);
  const [disabled, setDisabled] = useState(false);

//shuffling
const shuffleCards = ()  =>{
  const shuffledCards = [...cardImages,  ...cardImages]
    .sort(() =>  Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));

  setCards(shuffleCards);
  setTurns(0);
};

//handling of user choices

const handleChoice =  (card) =>{
  choiceOne ? setChoiceTwo(card) :setChoiceOne(card);
};


const resetTurn = () =>{
  setChoiceOne(null);
  setChoiceTwo(null); 
  setTurns((prevTurns) => prevTurns + 1);
};

return (
  <div className="App">
    <h1>MindFlip Memory Game</h1>
    <button className="new-game-btn" onClick={shuffleCards}>
      New Game
    </button>
    <div className="card-grid">
    </div>
  </div>
)

};





export default App;
