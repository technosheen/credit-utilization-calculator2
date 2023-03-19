import React from "react";
import uniqid from 'uniqid';

export default function Results(props) { 
    const { totalUsage, cards } = props;

    const checkUsage = (usage) => {
        return usage > 30.0 ? 'red' : 'black';
    }

    return (
        <div>
            <div className='usageRow'>
                <label className='outputTop' htmlFor='totalUsage'>
                    Total Credit Usage:
                </label>
                <output className={checkUsage(totalUsage)} id='totalUsage'>
                    { totalUsage + '%' }
                </output>
            </div>
            {
                cards.map((card, index) => {
                    return(
                        <div className='usageRow' key={uniqid()}>
                            <label className='outputLabels' htmlFor={'output' + (index + 1)}>
                                { 'Card ' + (index + 1) + ' Usage:'}
                            </label>
                            <output id={'output' + index} className={checkUsage(card.usage)}>
                                {card.usage + '%'}
                            </output>
                        </div>
                    );
                })
            }
        </div>
    );
}
