import React, {useState, useEffect} from "react";

export default function Card(props) {
    const { update, card, index } = props;
    const [cardObj, setCardObj] = useState(card);

    const getValue = (value) => {
        // Remove '$' from value if present
        value = value[0] === '$'? value.substring(1) : value;
        return value ?  ('$' + value) : '';
    };

    // Update parent whenever child changes
    useEffect(() => {
        update(cardObj, index); 
    }, [cardObj]);

    // Update child whenever input changes
    const handleInput = e => {
        let {name, value} = e.target;
        // Remove '$' from value if present
        value = value[0] === '$'? value.substring(1) : value;
        if (cardObj[name] !== value) { 
            setCardObj({...cardObj, [name]: value});
        }
    };

    const doSomething = () => { // TODO: implement popover
        console.log('clicked help button');
    };


    return (
        <div className='card'>
            <div className='inputLabels'>
                <label htmlFor={'balance' + index}>
                    {'Card ' + (index + 1) + ' balance'}
                </label>
                <div className='helpDiv'>
                    <label htmlFor={'limit' + index}>
                        {'Card ' + (index + 1) + ' limit'}
                    </label>
                    <button className='helpButton' onClick={doSomething}>?</button>
                </div>
            </div>
            <div className='inputRow'>
                <input name='balance'
                    id={'balance' + index}
                    onChange={handleInput}
                    value={getValue(cardObj.balance)}>
                </input>
                <input name='limit'
                    id={'limit' + index}
                    onChange={handleInput}
                    value={getValue(cardObj.limit)}>
                </input>
            </div>
        </div>
    );
}
