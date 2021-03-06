import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import book, { bookSaga } from "./book";
import savebook, { saveBookSaga } from "./savebook";
import order, { orderSaga } from "./order";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
const rootReducer = combineReducers({
  book,
  savebook,
  order,
  auth,
  user,
});

export function* rootSaga() {
  yield all([authSaga(), bookSaga(), saveBookSaga(), orderSaga(), userSaga()]);
}

export default rootReducer;
