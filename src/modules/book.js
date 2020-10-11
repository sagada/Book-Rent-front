import { createAction, handleActions } from "redux-actions";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../Utils/ActionTypes";

import { searchKakaoBook } from "../lib/book";

export const [
  SEARCH_KAKAO_REQUEST,
  SEARCH_KAKAO_SUCCESS,
  SEARCH_KAKAO_FAILURE,
] = ActionTypes("book/SEARCH_KAKAO_BOOK");

export const CHANGE_QUERY = "CHANGE_QUERY";
export const changeQuery = createAction(CHANGE_QUERY, (query) => query);
export const searchKakaoBookRequest = createAction(
  SEARCH_KAKAO_REQUEST,
  (param) => param
);

function* getKakaoBook(action) {
  console.log("action", action);
  try {
    const response = yield call(searchKakaoBook, action.payload);
    console.log("response :", response);
    yield put({
      type: SEARCH_KAKAO_SUCCESS,
      payload: response,
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
  page: 1,
  size: 6,
  query: "Java",
  target: "title",
  isLoading: false,
  kakaoBookResult: null,
};

const book = handleActions(
  {
    [CHANGE_QUERY]: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    [SEARCH_KAKAO_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),

    [SEARCH_KAKAO_SUCCESS]: (state, action) => ({
      ...state,
      kakaoBookResult: action.payload.data,
      isLoading: false,
    }),
  },
  initialState
);

export default book;
