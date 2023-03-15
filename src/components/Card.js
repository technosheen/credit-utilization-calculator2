import React from "react";

export default function Card(props) {
    const { index } = props;

    const doSomething = () => {
        console.log('clicked help button');
    };

    return (
        <div className='card'>
            <label for={'balance' + index}>{'Card' + index + 'balance'}</label>
            <input id={'balance' + index}></input>
            <div className='inputlabelDiv'>
                <label for={'limit' + index}>{'Card' + index + 'limit'}</label>
                <button className='helpButton' onClick={doSomething}>?</button>
            </div>
            <input id={'limit' + index}></input>
        </div>
    );
}
