
import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';

export default function App() {
  const {cards, setCards} = useState([{id: 'card1', balance: 0, limit: 0, usage: null}]);
  const {totalCreditUsage, setTotalCreditUsage} = useState(0);

  const addCard = () => {
    let clone = [...cards];
    let length = cards.length + 1;
    clone.push({id: 'card' + length, balance: 0, limit: 0 });
    setCards(clone);
  }

  const updateCard = (index, balance, limit) => { 
    let clone = [...cards];
    clone[index].balance = balance;
    clone[index].limit = limit;
    setCards(clone);
  }

  const calculate = () => {
    let subtotals = {balance: 0, limit: 0};
    let clone = [...cards];
    clone.forEach(card => { // change to map
      // Get percent usage: balance * 100 / limit
      card.usage = (card.balance * 100) / card.limit;
      subtotals.balance += card.balance;
      subtotals.limit += card.limit;
    })
    setTotalCreditUsage((subtotals.balance * 100) / subtotals.limit);
  }

  return (
    <div className='App'>
      <h1 className='mainHeader'>Credit Utilization Calculator</h1>
      <div className='calculator'>
        <form>
          {
            cards.forEach(( _card, i ) => {
              return <Card update={updateCard} index={i}></Card>
            })
          }
        </form>
        <button onClick={addCard}>Add Card</button>
        <button onClick={calculate}>Calculate</button>
        <Results totalUsage={totalCreditUsage} cards={cards}></Results>
      </div>
    </div>
  );
}

