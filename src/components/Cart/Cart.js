import { useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import Checkout from './Chekout';
import CartContext from '../../store/cart-context';


const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);

	const cartCtx = useContext(CartContext);
	const hasItems = cartCtx.items.length > 0;
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({...item, amount: 1});
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

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{ isCheckout && <Checkout onCancel={props.onClose} />}
			{ !isCheckout && modalActions }
		</Modal> 
	);
};

export default Cart;

