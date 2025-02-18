import React from "react";
import "./styles/SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
      if (!disabled) {
        handleChoice(card);
      }
    };

    return (
        <div className="card">
          <div className={flipped ? "card-flipped" : ""}>
            <img
              className="front"
              src={card.src}
              alt="card front"
              onClick={handleClick}
            />
            <img
              className="back"
              src="/img/cover.png"
              alt="card back"
              onClick={handleClick}
            />
          </div>
        </div>
      );
    }