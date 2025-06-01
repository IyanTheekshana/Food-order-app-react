import {  createContext, useReducer } from "react";

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';

const CartContext = createContext({
    items:[],
    addItem: (item)=>{},
    removeItem : (id) => {},
    clearCart : () => {}
});


function cartReducer(state, action){
    
    if(action.type === ADD_ITEM){
        const existingCarItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
        const updatedItems = [...state.items];
        if(existingCarItemIndex > -1){
            const existingItem = state.items[existingCarItemIndex];
            const updateItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCarItemIndex] = updateItem;
        }else{
            updatedItems.push({...action.item, quantity:1})
        }

        return {
            ...state, 
            items: updatedItems
        }

    }

    if(action.type === REMOVE_ITEM){
        const existingCarItemIndex = state.items.findIndex((item)=> item.id === action.id);
        const existingCartItem = state.items[existingCarItemIndex];
        const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCarItemIndex,1);
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity- 1
            }
            updatedItems[existingCarItemIndex] = updatedItem;
        }

        return {
            ...state, 
            items: updatedItems
        }

    }

    if(action.type === CLEAR_CART){
        return {...state, items:[]}
    }

    return state;
}

export function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item){
        dispatchCartAction({type: ADD_ITEM, item})
    }

    function removeItem(id){
        dispatchCartAction({type: REMOVE_ITEM, id})
    }

    function clearCart(){
        dispatchCartAction({type: CLEAR_CART})
    }

    const cartCtx = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    return <CartContext value={cartCtx}>{children}</CartContext>
}

export default CartContext;