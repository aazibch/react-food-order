import { useContext, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Button from '../UI/Button';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
    const [checkout, setCheckout] = useState(false);
    const [submittedOrder, setSubmittedOrder] = useState(false);
    const cartCtx = useContext(CartContext);

    const {
        sendRequest,
        loading: submittingOrder,
        error: httpError
    } = useHttp();

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        const requestConfig = {
            url: 'https://react-http-5b2d7-default-rtdb.firebaseio.com/orders',
            method: 'POST',
            body: {
                user: userData,
                orderedItems: cartCtx.items
            }
        };

        sendRequest(requestConfig, () => {
            cartCtx.clearCart();
            setSubmittedOrder(true);
        });
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <Button outline onClick={props.onClose}>
                Close
            </Button>
            {hasItems > 0 && <Button onClick={orderHandler}>Order</Button>}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {checkout && (
                <CheckoutForm
                    error={httpError}
                    onConfirm={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            {!checkout && modalActions}
        </>
    );

    const submittingOrderContent = <p>Sending order data...</p>;

    const submittedOrderContent = (
        <>
            <p>Successfully placed order!</p>
            <div className={classes.actions}>
                <Button outline onClick={props.onClose}>
                    Close
                </Button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!submittingOrder && !submittedOrder && cartModalContent}
            {submittingOrder && submittingOrderContent}
            {!submittingOrder && submittedOrder && submittedOrderContent}
        </Modal>
    );
};

export default Cart;
