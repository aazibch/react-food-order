import { forwardRef } from 'react';

import classes from './Input.module.css';

const Input = forwardRef((props, ref) => {
    let errorMessage;

    if (props.error) {
        errorMessage = <p className={classes.error}>{props.error}</p>;
    }

    return (
        <div className={`${classes.inputContainer} ${props.className}`}>
            <label className={classes.label} htmlFor={props.id}>
                {props.label}
            </label>
            <input className={classes.input} ref={ref} {...props.input} />
            {errorMessage}
        </div>
    );
});

export default Input;
