import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
import { fetchSuccess } from "../features/products/productSlice";
import { fetchCompleted, fetchFailure } from "../utility/commonSlice";
import { FETCH_PRODUCTS } from "../constants/actionConstants";

function* fetchProductSaga() {
  try {
    const response = yield call(axios.get, "https://fakestoreapi.com/products");
    yield put(fetchCompleted());
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

export function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductSaga);
}
