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
    setCards(() => cards.concat(newCard));
  };

  const rmCardField = (e) => {
    e.preventDefault();
    // Find and remove last card 
    let rmIndex = cards.length - 1;
    setCards(cards.splice(0, rmIndex));
  };


  const updateCard = (card, index) => { 
    // Original card values
    const balanceOG = cards[index].balance;
    const limitOG = cards[index].limit;

    setCards(() => {
      if (balanceOG !== card.balance || limitOG !== card.limit) {
        // Add user input values
        cards[index] = card;
      }
      return cards;
    });
  };


  // NOTE: Formula for percent usage -- balance * 100 / limit
  const handleCalculate = (e) => {
    e.preventDefault();
    let total;
    let subtotals = {balance: 0, limit: 0};
    
    cards.forEach(card => {
      if (!card.limit) return; // Don't divide by zero
      // Calculate single card usage & aggregate totals
      card.usage = ((card.balance * 100) / card.limit).toFixed(2);
      subtotals.balance += card.balance;
      subtotals.limit += card.limit;
    })

    // Calculate total credit usage
    total = !subtotals.balance && !subtotals.limit ?
    0 : ((subtotals.balance * 100) / subtotals.limit).toFixed(2);

    // Display results
    setTotalCreditUsage(total);
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
        <div className='addButtonRow'>
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

