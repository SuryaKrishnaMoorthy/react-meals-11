import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
	const [isBtnHighlighted, setIsButtonHighlighted] = useState(false);

	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;
	const numberOfCartItems = items.reduce((curNum, item) => { return (curNum + item.amount)}, 0)
	const btnClass = `${classes.button} ${isBtnHighlighted ? classes.bump : ''}`;

	useEffect(() => {
		if(items.length === 0) return;

		setIsButtonHighlighted(true);

		const timer = setTimeout(() => {
			setIsButtonHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClass} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button> 
	)
}

export default HeaderCartButton;