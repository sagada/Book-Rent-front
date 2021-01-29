import {handleActions, createAction} from "redux-actions";
import {call, put, takeLatest} from "redux-saga/effects";
import {ActionTypes} from "../Utils/ActionTypes";

import {getOrders, modifyOrder, deleteOrderBook} from "../lib/order";

export const [
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILURE,
] = ActionTypes("order/GET_ORDER_LIST");
export const [
    MODIFY_ORDER_REQUEST,
    MODIFY_ORDER_SUCCESS,
    MODIFY_ORDER_FAILURE,
] = ActionTypes("order/MODIFY_ORDER");

export const [
    DELETE_ORDER_BOOK_REQUEST,
    DELETE_ORDER_BOOK_SUCCESS,
    DELETE_ORDER_BOOK_FAILURE,
] = ActionTypes("order/DELETE_ORDER_BOOK_");

export const MODIFY_ORDER_ID = "MODIFY_ORDER_ID";
const initialState = {
    orderResult: null,
    isLoading: false,
    modifyOrderId: null,
};

export const modifyOrderAction = createAction(
    MODIFY_ORDER_ID,
    (param) => param
);

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

function* modifyOrderSaga(action) {
    console.log("action ", action);
    try {
        const response = yield call(modifyOrder, action.payload);
        console.log("response :", response);
        yield put({
            type: GET_ORDER_LIST_REQUEST,
            payload: action.payload.search,
        });
    } catch (e) {
        yield put({
            type: MODIFY_ORDER_FAILURE,
            payload: e,
            error: true,
        });
    }
}

function* deleteOrderBookSaga(action) {
    console.log("action ", action);
    try {
        const response = yield call(deleteOrderBook, action.payload);
        yield put({
            type: GET_ORDER_LIST_REQUEST,
            payload: action.payload.search,
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
    yield takeLatest(MODIFY_ORDER_REQUEST, modifyOrderSaga);
    yield takeLatest(DELETE_ORDER_BOOK_REQUEST, deleteOrderBookSaga);
}

const order = handleActions(
    {
        [MODIFY_ORDER_ID]: (state, action) => ({
            ...state,
            modifyOrderId: action.payload,
        }),
        [GET_ORDER_LIST_REQUEST]: (state, action) => ({
            ...state,
            orderResult: null,
            isLoading: true,
        }),
        [GET_ORDER_LIST_SUCCESS]: (state, action) => ({
            ...state,
            orderResult: action.payload.data,
            isLoading: false,
        }),
    },
    initialState
);

export default order;
