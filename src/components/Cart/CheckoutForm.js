import useForm from '../../hooks/useForm';
import { checkoutFormConfig } from '../../utils/checkoutFormConfig';
import Button from '../UI/Button';
import classes from './CheckoutForm.module.css';

const CheckoutForm = (props) => {
    const { createFormInputs, isFormValid, getFormValues } =
        useForm(checkoutFormConfig);

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            return;
        }

        props.onConfirm(getFormValues());
    };

    let error;

    if (props.error) error = <p className={classes.error}>{props.error}</p>;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            {error}
            {createFormInputs()}
            <div className={classes.actions}>
                <Button disabled={!isFormValid()}>Submit</Button>
            </div>
        </form>
    );
};

export default CheckoutForm;
