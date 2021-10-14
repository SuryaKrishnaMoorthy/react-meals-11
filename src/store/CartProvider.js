import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0
}

const cartReducer = (state=defaultCartState, action) => {
	let updatedItems;

	switch(action.type) {
		case 'ADD':
			let updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
			let existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			); 

			let existingCartItem = state.items[existingCartItemIndex];
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
			
			let existingCartIndex = state.items.findIndex(
				(item) => item.id === action.id
				); 
				let existingItem = state.items[existingCartIndex];
				let updatedTotal = state.totalAmount - existingItem.price;
				if (existingItem.amount === 1) {
					updatedItems = state.items.filter(item => item.id !== action.id);
				} else {
					const updatedItem = {...existingItem, amount: existingItem.amount-1 };
					updatedItems = [...state.items];
					updatedItems[existingCartIndex] = updatedItem;
				}
				return {
					items: updatedItems,
					totalAmount: updatedTotal
				}; 
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