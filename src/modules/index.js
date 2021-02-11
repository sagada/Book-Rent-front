import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import book, { bookSaga } from "./book";
import savebook, { saveBookSaga } from "./savebook";
import order, { orderSaga } from "./order";
import auth, { authSaga } from "./auth";
const rootReducer = combineReducers({
  book,
  savebook,
  order,
  auth,
});

export function* rootSaga() {
  yield all([authSaga(), bookSaga(), saveBookSaga(), orderSaga()]);
}

export default rootReducer;
