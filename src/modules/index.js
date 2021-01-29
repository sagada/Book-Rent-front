import {combineReducers} from "redux";
import {all} from "redux-saga/effects";

import book, {bookSaga} from "./book";
import savebook, {saveBookSaga} from "./savebook";
import order, {orderSaga} from "./order";

const rootReducer = combineReducers({
    book,
    savebook,
    order,
});

export function* rootSaga() {
    yield all([bookSaga(), saveBookSaga(), orderSaga()]);
}

export default rootReducer;
