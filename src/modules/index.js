import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import book, { bookSaga } from "./book";
import savebook, { saveBookSaga } from "./savebook";
const rootReducer = combineReducers({
  book,
  savebook,
});

export function* rootSaga() {
  yield all([bookSaga(), saveBookSaga()]);
}

export default rootReducer;
