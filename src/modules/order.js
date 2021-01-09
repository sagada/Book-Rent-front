import { handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../Utils/ActionTypes";

import { getOrders } from "../lib/order";

export const [
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
] = ActionTypes("order/GET_ORDER_LIST");

const initialState = {
  orderResult: null,
  isLoading: false,
  outerOrderResult: null,
};

function* getOrderListSaga(action) {
  console.log("action ", action);
  try {
    const response = yield call(getOrders, action.payload);
    console.log("response :", response);
    yield put({
      type: GET_ORDER_LIST_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: GET_ORDER_LIST_FAILURE,
      payload: e,
      error: true,
    });
  }
}

export function* orderSaga() {
  yield takeLatest(GET_ORDER_LIST_REQUEST, getOrderListSaga);
}

const order = handleActions(
  {
    [GET_ORDER_LIST_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [GET_ORDER_LIST_SUCCESS]: (state, action) => ({
      ...state,
      orderResult: action.payload.data,
      isLoading: false,
      outerOrderResult: action.payload.data.content,
    }),
  },
  initialState
);

export default order;
