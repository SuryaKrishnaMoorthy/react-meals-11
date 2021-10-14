import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0
}

const cartReducer = (state=defaultCartState, action) => {
	switch(action.type) {
		case 'ADD':
			const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			); 

			const existingCartItem = state.items[existingCartItemIndex];
			let updatedItems;
			if(existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount
				}
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems =  state.items.concat(action.item);
			};

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount
			};
		case 'REMOVE':
			return 
		default:
			return defaultCartState;
	}
}

const CartProvider = (props) => {

	const [cartState, dispatchCartActions] = useReducer(cartReducer, defaultCartState);
	const addItemHandler = (item) => {
		dispatchCartActions({ type: 'ADD', item: item });
	};

	const removeItemHandler = (id) => {
		dispatchCartActions({ type: 'REMOVE', id: id });
	};

	const cartContext = {
		items:cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler
	}
	return (
		<CartContext.Provider value={cartContext}>
				{props.children}
		</CartContext.Provider>
	)

}

export default CartProvider;