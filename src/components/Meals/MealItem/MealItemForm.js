import { useRef, useState } from 'react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNum = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNum < 1 ||
            enteredAmountNum > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNum);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                className={classes.countInputContainer}
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <Button small>+ Add</Button>
            {!amountIsValid && (
                <p>Please enter a valid amount (1-5 permitted).</p>
            )}
        </form>
    );
};

export default MealItemForm;
