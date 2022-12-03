import classes from './Button.module.css';

const Button = (props) => {
    const buttonClasses = [classes.button];

    if (props.outline) buttonClasses.push(classes['button_outline']);

    if (props.small) buttonClasses.push(classes['button_small']);

    return (
        <button
            className={buttonClasses.join(' ')}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
