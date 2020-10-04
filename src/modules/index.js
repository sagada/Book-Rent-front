import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import book, { bookSaga } from "./book";

const rootReducer = combineReducers({
  book,
});

export function* rootSaga() {
  yield all([bookSaga()]);
}

export default rootReducer;
