import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import createSagaMiddleware from "redux-saga";
import productReducer from "./features/products/productSlice";
import commonReducer from "./utility/commonSlice";
import orderReducer from "./features/orders/orderSlice";
import { productSaga } from "./saga/productSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    common: commonReducer,
    order: orderReducer,
  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(productSaga);

export default store;
