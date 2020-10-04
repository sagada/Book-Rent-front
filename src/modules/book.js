import { createAction, handleActions } from "redux-actions";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../Utils/ActionTypes";

import { searchKakaoBook } from "../lib/book";

export const [
  SEARCH_KAKAO_REQUEST,
  SEARCH_KAKAO_SUCCESS,
  SEARCH_KAKAO_FAILURE,
] = ActionTypes("book/SEARCH_KAKAO_BOOK");

export const searchKakaoBookRequest = createAction(
  SEARCH_KAKAO_REQUEST,
  (param) => param
);

function* getKakaoBook(action) {
  console.log("action", action);
  try {
    const searchResult = yield call(searchKakaoBook, action.payload);
    yield put({
      type: SEARCH_KAKAO_SUCCESS,
      payload: searchResult,
    });
  } catch (e) {
    yield put({
      type: SEARCH_KAKAO_FAILURE,
      payload: e,
      error: true,
    });
  }
}

export function* bookSaga() {
  yield takeLatest(SEARCH_KAKAO_REQUEST, getKakaoBook);
}
const initialState = {
  searchResult: null,
  page: 1,
  size: 10,
  query: "Java",
  target: "title",
};

const book = handleActions(
  {
    [SEARCH_KAKAO_REQUEST]: (state, action) => ({
      ...state,
      searchResult: action.payload,
    }),
  },
  initialState
);

export default book;
