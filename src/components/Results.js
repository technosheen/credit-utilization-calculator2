import React from "react";

export default function Results(props) { 
    const { totalUsage, cards } = props;

    return (
        <div>
            <h5>{'Total Credit Usage: ' + totalUsage +' %'}</h5>
            {
                cards.forEach((card, index) => {
                    return(
                        <div>
                            <h5>{'Card' + index + 'Usage: '}</h5>
                            <h5 className={card.usage > 30.0 ? 'red' : 'blue'}>{card.usage + '%'}</h5>
                        </div>
                    );
                })
            }
        </div>
    );
}
