import React from "react";


export default function labels(props) {
const {index, toggleOverlay, closePopover} = props;


    return (
        <div className='labels'>
        <label htmlFor={'balance' + index}>
            {'Card ' + (index + 1) + ' balance'}
        </label>
        <div className='helpDiv'>
            <label htmlFor={'limit' + index}>
                {'Card ' + (index + 1) + ' limit'}
            </label>
            <details id={'pop' + index} onToggle={toggleOverlay}>
                <summary>?</summary>
                <div className='popover'>
                    <h5 className='popHead'>Card Balance / Limit</h5>
                    <p className='popBody'>Your card's balance and limit can be found on your credit card statement.</p>
                    <div className='btnFloatRight'>
                        <button onClick={closePopover} className='close'>Close</button>
                    </div>
                </div>
            </details>
        </div>
        </div>
    );
}