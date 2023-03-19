import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Card from './components/Card';
import Results from './components/Results';

export default function App() {
  const [cards, setCards] = useState([{balance: 0, limit: 0, usage: 0}]);
  const [totalCreditUsage, setTotalCreditUsage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    setIsMax( cards.length === 5 ? true : false); 
  }, [cards]);


  const addCardField = (e) => {
    e.preventDefault();
    // Create and add new card
    let newCard = {balance: 0, limit: 0, usage: 0};
    setCards((oldCards) => [...oldCards, newCard]);
  };

  const rmCardField = (e) => {
    e.preventDefault();
    // Find and remove last card 
    let rmIndex = cards.length - 1;
    setCards((oldCards) => {
      oldCards.pop();
      return [...oldCards];
    });
  };


  const updateCard = (childCard, index) => { 
    // Original card values
    const oldBalance = cards[index].balance;
    const oldLimit = cards[index].limit;

    if (oldBalance !== childCard.balance || oldLimit !== childCard.limit) {
      // Add user input values
      cards[index] = childCard;
      // Update card's usage ratio
      if (!childCard.limit) {
        cards[index].usage = 0;
      } else {
        cards[index].usage = ((childCard.balance * 100) / childCard.limit).toFixed(2)
      }
    }
    return;
  };


  useEffect(() => {
    // Update total usage when cards change
    let total;
    let subtotals = {balance: 0, limit: 0};
  
    // Aggregate values
    cards.forEach((card, i) => {
      if (!card.limit){
        // If limit is zero, usage is zero
        subtotals.balance += 0;
      } else {
        subtotals.balance += card.balance;
      }
      subtotals.limit += card.limit;
    })

    // Calculate total credit usage
    total = !subtotals.limit ?
    0 : ((subtotals.balance * 100) / subtotals.limit).toFixed(2);
    setTotalCreditUsage(total);
  }, [cards])


  // NOTE: Formula for percent usage -- balance * 100 / limit
  const handleCalculate = (e) => {
    e.preventDefault();
    // Force re-render to update total usage
    setCards([...cards]);
    // Display results
    setShowResults(true);
  };

  const getBtnStyle = (type) => {
    // Hide '+' btn if reached max card#
    if ( type === 'add') {
      return isMax ? 'disabledBtn' : 'addBtn';
    }
    // Hide '-' btn if only one card
    return cards.length > 1 ? 'addBtn' : 'hide';
  }


  return (
    <div id='app'>
      <h1>Credit Utilization Calculator</h1>
      <div className='calculator'>
        <form>
          {
            cards.map( (card, index) => {
              return (
                <Card 
                  card={card}
                  index={index}
                  import key={uniqid()}
                  update={updateCard}
                />
              )
            })
          }
        </form>
        <div className='btnFloatRight'>
          <button onClick={rmCardField} className={getBtnStyle('remove')}>- Card</button>
          <button onClick={addCardField} className={getBtnStyle('add')} disabled={isMax}>+ Card</button>
        </div>
        <div className='buttonRow'>
          <button className='submit' onClick={handleCalculate}>Calculate</button>
        </div>
        {
          showResults ? 
          <Results totalUsage={totalCreditUsage} cards={cards}/>
          :
          null
        }
      </div>
    </div>
  );
}

