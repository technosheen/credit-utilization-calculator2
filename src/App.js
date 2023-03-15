
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

export default function App() {
  const {cards, setCards} = useState([{id: 'card1', balance: 0, limit: 0 }]);

  const addCard = () => {
    
  }

  return (
    <div className='App'>
      <h1 className='mainHeader'>Credit Utilization Calculator</h1>
      <div className='calculator'>
        <form>
          {/* {
            cards.forEach(( card, i ) => {
              return <Card index={i}></Card>
            })
          } */}
          
        </form>
      </div>
    </div>
  );
}

