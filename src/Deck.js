import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [currCard, setCurrCard] = useState(null);
  
  useEffect(() => {
    const shuffleDeck = async () => {
      let newDeck = await axios.get(`${BASE_URL}/new/shuffle`);
      setDeck(newDeck.data);
    }
    shuffleDeck();
  }, []);

    const drawCard = async () => {
      let { deck_id } = deck;

      try{
        let res = await axios.get(`${BASE_URL}/${deck_id}/draw/`);
        console.log(`remaining: ${res.data.remaining}`);
        console.log(`deck_id: ${res.data.deck_id}`);

        if(res.data.remaining === 0) {
          throw new Error('no cards remaining!')
        }

        setCurrCard(res.data.cards[0]);
        console.log(currCard);

      } catch (err) {
        alert(err);
      }
    }

  return (
    <div>
      <button onClick={drawCard}>Draw a Card</button>

      {currCard ? 
      (<div>
        <Card
          key={currCard.code}
          name={currCard.value + 'of' + currCard.suit}
          image={currCard.image}
        />
      </div>) 
      : null}
    </div>
  );
}

export default Deck;