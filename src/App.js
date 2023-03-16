import React, { useState } from 'react';
import uniqid from 'uniqid';
import Card from './components/Card';
import Results from './components/Results';

export default function App() {
  const [cards, setCards] = useState([{balance: 0, limit: 0, usage: 0}]);
  const [totalCreditUsage, setTotalCreditUsage] = useState(0);
  const [showResults, setShowResults] = useState(false);


  const addCardField = (e) => {
    e.preventDefault();
    setCards(() => cards.concat({balance: 0, limit: 0, usage: 0}));
  };

  const updateCard = (card, index) => { 
    // Original card values
    let balanceOG = cards[index].balance;
    let limitOG = cards[index].limit;

    // If values have changed
    setCards(() => {
      if (balanceOG !== card.balance || limitOG !== card.limit) {
        cards[index] = card;
      }
      return cards;
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    console.log(cards);
    let subtotals = {balance: 0, limit: 0};
    cards.forEach(card => { // change to map
      // Get percent usage: balance * 100 / limit
      if (!card.limit) return;
      card.usage = (card.balance * 100) / card.limit;
      subtotals.balance += card.balance;
      subtotals.limit += card.limit;
    })
    if (!subtotals.balance && !subtotals.limit) {
      // displayError
      return;
    }
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
          {console.log('64 cards: ', cards)}
          {
            cards.map( (card, index) => {
              console.log('rendering card ', index);
              return<Card update={updateCard} card={card} index={index} import key={uniqid()}></Card>
            })
          }
        </form>
        <button className='addBtn' onClick={addCardField}>Add Card</button>
        <div className='buttonRow'>
          <button className='submit' onClick={handleCalculate}>Calculate</button>
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

