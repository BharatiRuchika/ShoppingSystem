
// import { ADD_TODO, TOGGLE_TODO } from "../actions/todoActions";
import { createSlice } from "@reduxjs/toolkit"

    const initialState = {
        cart: [],
        orders: [],
        cartCount: 0,
        orderTotal: 0,
        success: "",
        error: "",
}

// reducer using redux-toolkit
const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        getData: (state, action)=>{
            state.cart = action.payload.cart
            state.orders = action.payload.orders
        },

        addToCart: (state, action)=>{
            console.log('payload',action.payload)
            console.log('cart',action.payload.cart)
            console.log('index',action.payload.index)
            state.cart = [...state.cart, { quantity: 1, ...action.payload.cart }]
            state.orderTotal =  Number(state.orderTotal + action.payload.cart.price);
            state.success = "Product Added to cart!!"
        },

        increaseQty: (state, action) => {
            console.log('cartpayload',action.payload)
            console.log('index',action.payload.index)
            state.cart = action.payload.cart
            state.orderTotal =  Number(state.orderTotal + action.payload.cart[action.payload.index].price);
            state.success = "Product Quantity Increased!!"
        },

        decreaseQty: (state, action) => {
            console.log('cartpayload',action.payload)
            state.cart = action.payload.cart
            state.orderTotal =  Number(state.orderTotal - action.payload.cart[action.payload.index].price);
            state.success = "Product Quantity Decreased!!"
        },

        removeCart: (state, action) => {
            state.cart = action.payload.cart
            state.cartCount = state.cartCount - 1
            state.orderTotal = Number(state.orderTotal - (action.payload.cartItem.price * action.payload.cartItem.quantity)) 
            state.success = "product removed from cart successfully!"
        },

        initializedata: (state,action) => {
            console.log('cart',action.payload.cart)
            state.cart = action.payload.cart
            state.orders = action.payload.orders
           
            let total = action.payload.cart.reduce((accumulator, item) => {
                return accumulator + (item.price * item.quantity);
            }, 0);
            console.log('total',total)
            state.orderTotal = total
            state.cartCount = state.cart.length
        },

        clearCart: (state, action) => {
            state.total = 0
            state.cart = []
            state.cartCount = 0
        },

        placeOrder: (state, action)=>{
            state.orders.push({ date : action.payload.currentDate , cart : action.payload.cart , orderTotal : action.payload.orderTotal })
            state.cart = []
            state.cartCount = 0 
            state.orderTotal = 0
            state.success = "Congratulations!!Order Placed Successfully!!"
        },
        clearProductNoty: (state,action) => {
            state.error = ""
            state.success = ""
        }
    }
})

export const productReducer = productSlice.reducer
export const actions = productSlice.actions
console.log('productActions',actions)
export const productSelector = (state) => state.product



