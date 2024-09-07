import {configureStore} from "@reduxjs/toolkit"
import rootReducer from './reducers/index.js'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const deliveryAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
  },
  user: { userInfo: userInfoFromStorage },
}


const store = configureStore({
reducer:  rootReducer,
preloadedState: initialState,
}
)

export default store
