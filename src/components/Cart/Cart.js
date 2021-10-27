import { useContext, useState, Fragment } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import Checkout from './Chekout';
import CartContext from '../../store/cart-context';


const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);
	const hasItems = cartCtx.items.length > 0;
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({...item, amount: 1});
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);

		await fetch(`https://task-tracker-15-http-default-rtdb.firebaseio.com/orders.json`, {
			method: 'POST',
			body: JSON.stringify({
				orderedItems: cartCtx.items,
				user: userData
			}),
		});

		setIsSubmitting(false);
		setDidSubmit(true);
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
		{cartCtx.items.map(item => (
			<CartItem 
				key={item.id}
				{...item}
				onRemove={cartItemRemoveHandler.bind(null, item.id)}
				onAdd={cartItemAddHandler.bind(null, item)}
			/> 
			))}
		</ul>
		);

	const orderHandler = () => {
		setIsCheckout(true);
	}

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
			{ hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
		</div>
	)

	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{ isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
			{ !isCheckout && modalActions }
		</Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
			<button className={classes.button} onClick={props.onClose}>Close</button>
		</div>
		</Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal> 
	);
};

export default Cart;

