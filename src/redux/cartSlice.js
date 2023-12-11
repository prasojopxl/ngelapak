import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cartItems:[]
}

export const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers: {
        addCartItem:(state, action)=> {
            const newItem = action.payload;
            const selectedCartIndex = state.cartItems.findIndex((product)=> product.id === newItem.id)
            if(selectedCartIndex !== -1) {
                state.cartItems[selectedCartIndex].quantity += 1
                state.cartItems[selectedCartIndex].totalPrice = state.cartItems[selectedCartIndex].quantity * state.cartItems[selectedCartIndex].price
            } else {
                state.cartItems.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
        },
        minCartItem: (state, action) => {
            const newItem = action.payload;
            const selectedCartIndex = state.cartItems.findIndex((product) => product.id === newItem.id);
            if (selectedCartIndex !== -1) {
                state.cartItems[selectedCartIndex].quantity -= 1;
                state.cartItems[selectedCartIndex].totalPrice = state.cartItems[selectedCartIndex].quantity * state.cartItems[selectedCartIndex].price;
                if (state.cartItems[selectedCartIndex].quantity === 0) {
                    state.cartItems.splice(selectedCartIndex, 1);
                }
            }
        },
    }
})


export const {addCartItem, minCartItem} = cartSlice.actions
export default cartSlice;

export const selectCartTotalItems = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrices = state => state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0)
export const selectCartItems = state => state.cart.cartItems
