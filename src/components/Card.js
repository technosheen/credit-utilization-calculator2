import React, {useState, useEffect} from "react";
import Labels from './Labels'


export default function Card(props) {
    const { card, index, update} = props;
    const overlay = document.getElementById('overlay' + index);
    const popover = document.getElementById('pop' + index);
    const charMax = 8;
    const [cardObj, setCardObj] = useState(card);
    const [overlayIsOpen, setOverlayIsOpen] = useState(false);
    const [displayValues, setDisplayValues] = useState({
        balance: styleValue(cardObj.balance),
        limit: styleValue(cardObj.limit)
    });


    const handleInput = e => {
        e.preventDefault();
        let {name, value} = e.target;

        // Remove any display styling
        const hasOnlyNumbers = /^\d+$/.test(value);
        value = hasOnlyNumbers ? parseInt(value) : unstyleValue(value);


        // Update child ONLY if input has changed
        setCardObj((oldCard) => {
            return oldCard[name] !== value ?
                {...oldCard, [name]: value} :
                oldCard;
        });

        // Update cards array in parent
        value = value || 0;
        update({...cardObj, [name]: value}, index);
    };

    useEffect(() => { // Style inputs on change
        let bal = styleValue(cardObj.balance)
        let lim = styleValue(cardObj.limit)
        setDisplayValues({balance: bal, limit: lim});
    }, [cardObj]);


    const toggleOverlay = (e) => { 
        e.preventDefault();
        let isVisible = e.target.hasAttribute('open');
        setOverlayIsOpen(isVisible);
        if (isVisible) overlay.style.position = 'absolute';
    };

    const closePopover = (e) => {
        e.preventDefault();
        if (popover.hasAttribute('open')) {
            overlay.style.position = 'relative';
            popover.removeAttribute('open');
        }
    }

    return (
        <div className='card'>
            <div 
                id={'overlay' + index} 
                onClick={closePopover}
                className={overlayIsOpen ? 'popOverlay' : 'hide'}>
            </div>
            <Labels index={index} toggleOverlay={toggleOverlay} closePopover={closePopover}/>
            <div className='inputRow'>
                <input 
                    name='balance'
                    maxLength={charMax}
                    id={'balance' + index}
                    onChange={handleInput}
                    value={displayValues.balance}>
                </input>
                <input 
                    name='limit'
                    maxLength={charMax}
                    id={'limit' + index}
                    onChange={handleInput}
                    value={displayValues.limit}>
                </input>
            </div>
        </div>
    );
}


const styleValue = (value) => {
    // If 0 or falsy, return empty string
    if (!value) return '';

    // Remove styling
    value = unstyleValue(value);

    // Style with commas and '$'
    value = '$' + (value.toLocaleString("en-US"));
    return value;
};

const unstyleValue = (value) => {
    // If value is styled
    if (typeof value === 'string') {
        // Remove all non-numbers and cast as int
        value = parseInt(value.replace(/[^0-9]/g, ""))
    }
    return value;
}
