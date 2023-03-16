import React, {useState, useEffect} from "react";

export default function Card(props) {
    const { update, card, index } = props;
    const [cardObj, setCardObj] = useState(card);

    useEffect(() => {
        update(cardObj, index); // Update parent whenever child changes
    }, [cardObj]);

    const handleInput = e => {
        const {name, value} = e.target;
        if (cardObj[name] !== value) { // Update child whenever input changes
            setCardObj({...cardObj, [name]: value});
        }
    };

    const doSomething = () => {
        console.log('clicked help button');
    };


    return (
        <div className='card'>
            <div className='inputLabels'>
                <label htmlFor={'balance' + index}>{'Card ' + (index + 1) + ' balance'}</label>
                <div className='helpDiv'>
                    <label htmlFor={'limit' + index}>{'Card ' + (index + 1) + ' limit'}</label>
                    <button className='helpButton' onClick={doSomething}>?</button>
                </div>
            </div>
            <div className='inputRow'>
                <input onChange={handleInput} value={cardObj.balance ? cardObj.balance : ''} name='balance' id={'balance' + index}></input>
                <input onChange={handleInput} value={cardObj.limit ? cardObj.limit : ''} name='limit' id={'limit' + index}></input>
            </div>
        </div>
    );
}
