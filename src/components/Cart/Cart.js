import { useContext } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';


const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const hasItems = cartCtx.items.length ? true : false
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const cartItems = (
		<ul className={classes['cart-items']}>
		{cartCtx.items.map(item => (
			<CartItem key={item.id} {...item} /> 
			))}
		</ul>
		);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
				{ hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal> 
	);
};

export default Cart;

