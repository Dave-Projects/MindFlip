import React from "react";
import  "./styles/SingleCard.css";

export default function SingleCard({car, handleChoice, flipped, disabled}){

    const handleClick = () => {
        
    };


    return (
        <div classname="card">
            <div classname={flipped ? "card-flipped" : "" }>
            <img
                className="front"
                src={SingleCard.src}
                alt="card front"
                onClick={handleClick}
            />
            <img
                className="back"
                src="/"
                alt="card back"
                onclick={handleClick}
            />
            </div>
        </div>
    );
}