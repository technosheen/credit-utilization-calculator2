import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Card from './components/Card';
import Results from './components/Results';

export default function App() {
  const [cards, setCards] = useState([{id: 1, balance: 0, limit: 0, usage: 0}]);
  const [totalCreditUsage, setTotalCreditUsage] = useState(0);
  const [showResults, setShowResults] = useState(false);


  const addCard = () => {
    let clone = [...cards];
    let length = cards.length + 1;
    clone.push({id: length, balance: 0, limit: 0 });
    setCards(clone);
  };

  const updateCard = (index, balance, limit) => { 
    let clone = [...cards];
    clone[index].balance = balance;
    clone[index].limit = limit;
    setCards(clone);
  };

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
    setShowResults(true)
  };

  // useEffect(() =>{
  //   setShowResults(true);
  // }, [totalCreditUsage]);

  return (
    <div id='app'>
      <h1 className='mainHeader'>Credit Utilization Calculator</h1>
      <div className='calculator'>
        <form>
          {
            cards.map( card => {
              return<Card update={updateCard} card={card} import key={uniqid()}></Card>
            })
          }
        </form>
        <button className='addBtn' onClick={addCard}>Add Card</button>
        <div className='buttonRow'>
          <button className='submit' onClick={calculate}>Calculate</button>
        </div>
        {
          showResults ? 
          <Results totalUsage={totalCreditUsage} cards={cards}></Results>
          :
          null
        }
      </div>
    </div>
  );
}

