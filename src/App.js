import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Card from './components/Card';
import Results from './components/Results';

export default function App() {
  const [cards, setCards] = useState([
    {balance: 0, limit: 0, usage: 0}, 
    {balance: 0, limit: 0, usage: 0} // Added second card
  ]);
  const [totalCreditUsage, setTotalCreditUsage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    // Limit the number of inputs to 5 cards
    setIsMax( cards.length === 5 ? true : false); 
  }, [cards]);


  const addCardField = (e) => {
    e.preventDefault();
    // Only add new card if there are less than 5 cards
    setCards((oldCards) => {
      if (oldCards.length < 5) {
        let newCard = {balance: 0, limit: 0, usage: 0};
        return [...oldCards, newCard];
      }
      return oldCards;
    });
  };
  
  const rmCardField = (e) => {
    e.preventDefault();
    // Remove last card
    setCards((oldCards) => {
      oldCards.pop();
      return [...oldCards];
    });
  };

  // Updates cards array without re-rendering
  const updateCard = (childCard, index) => { 
    // Original card values
    const oldBalance = cards[index].balance;
    const oldLimit = cards[index].limit;

    if (oldBalance !== childCard.balance || oldLimit !== childCard.limit) {
      // Update card balance/limit
      cards[index] = childCard;

      // Update card usage ratio
      if (!childCard.limit || !childCard.balance) {
        cards[index].usage = 0;
      } else {
        cards[index].usage = ((childCard.balance * 100) / childCard.limit).toFixed(2)
      }
    }
    return;
  };

  // NOTE: Formula for percent usage -- balance * 100 / limit
  useEffect(() => {
    // Update total usage ratio when cards change
    let total;
    let subtotals = {balance: 0, limit: 0};
  
    // Aggregate values
    cards.forEach((card, i) => {
      if (!card.limit) {
        // If limit is zero, usage is zero
        subtotals.limit += 0
        subtotals.balance += 0;
      } else {
        subtotals.balance += card.balance;
        subtotals.limit += card.limit;
      }
    })

    // Calculate total credit usage
    if (!subtotals.limit || !subtotals.balance) {
      total = 0;
    } else {
      total = ((subtotals.balance * 100) / subtotals.limit).toFixed(2);
    }
    setTotalCreditUsage(total);
  }, [cards])

  const handleCalculate = (e) => {
    e.preventDefault();
    // Force re-render to update usages
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
    return cards.length > 2 ? 'addBtn' : 'hide';
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
        <div className='btnFloatLeft'>
        <button onClick={addCardField} className={getBtnStyle('add')} disabled={isMax}>Add additonal card</button>
        <button onClick={rmCardField} className={getBtnStyle('remove')}>Remove card</button>
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

