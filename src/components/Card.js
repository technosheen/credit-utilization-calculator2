import React, {useState, useEffect} from "react";

export default function Card(props) {
    const { update, card } = props;
    // const [balance, setBalance] = useState(card.balance);
    // const [limit, setLimit] = useState(card.limit);

    const doSomething = () => {
        console.log('clicked help button');
    };

    // const addBalance = (e) => {
    //     setBalance(e.target.value);
    // };

    // const addLimit = (e) => {
    //     setLimit(e.target.value);
    // };

    // useEffect(() => {
    //     update(card.id, balance, limit);
    // }, [balance, limit]);
    //onBlur={addBalance}
    // onBlur={addLimit}

    return (
        <div className='card'>
            <div className='inputLabels'>
                <label htmlFor={'balance' + card.id}>{'Card' + card.id + 'balance'}</label>
                <div className='helpDiv'>
                    <label htmlFor={'limit' + card.id}>{'Card' + card.id + 'limit'}</label>
                    <button className='helpButton' onClick={doSomething}>?</button>
                </div>
            </div>
            <div className='inputRow'>
                <input id={'balance' + card.id}></input>
                <input id={'limit' + card.id}></input>
            </div>
        </div>
    );
}
