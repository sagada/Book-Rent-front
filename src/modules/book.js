import { createAction, handleActions } from "redux-actions";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../Utils/ActionTypes";

import { searchKakaoBook } from "../lib/book";

export const [
  SEARCH_KAKAO_REQUEST,
  SEARCH_KAKAO_SUCCESS,
  SEARCH_KAKAO_FAILURE,
] = ActionTypes("book/SEARCH_KAKAO_BOOK");

export const CHANGE_SAVE_BOOK_FLAG = "CHANGE_SAVE_BOOK_FLAG";
export const CHANGE_FALG_LIST_INDEX = "CHANGE_FALG_LIST_INDEX";

export const CHANGE_TARGET = "CHANGE_TARGET";
export const CHANGE_QUERY = "CHANGE_QUERY";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const chagneFlagListIndex = createAction(
  CHANGE_FALG_LIST_INDEX,
  (idx) => idx
);
export const changeSaveBookFlag = createAction(
  CHANGE_SAVE_BOOK_FLAG,
  (flag) => flag
);
export const changePage = createAction(CHANGE_PAGE, (page) => page);
export const changeQuery = createAction(CHANGE_QUERY, (query) => query);
export const changeTarget = createAction(CHANGE_TARGET, (target) => target);
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
  size: 8,
  query: "Java",
  target: "title",
  isLoading: false,
  kakaoBookResult: null,
  saveBookFlag: false,
  saveBookList: [],
};

const book = handleActions(
  {
    [CHANGE_FALG_LIST_INDEX]: (state, action) => ({
      ...state,
      saveBookList: [
        ...state.saveBookList.slice(0, action.payload),
        !state.saveBookList[action.payload],
        ...state.saveBookList.slice(action.payload + 1),
      ],
    }),
    [CHANGE_SAVE_BOOK_FLAG]: (state, action) => ({
      ...state,
      saveBookFlag: action.payload,
      saveBookList: Array.from({ length: state.size }, (undefined, i) => false),
    }),
    [CHANGE_PAGE]: (state, action) => ({
      ...state,
      page: action.payload,
    }),
    [CHANGE_TARGET]: (state, action) => ({
      ...state,
      target: action.payload,
    }),
    [CHANGE_QUERY]: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    [SEARCH_KAKAO_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
      saveBookFlag: false,
      saveBookList: [],
    }),

    [SEARCH_KAKAO_SUCCESS]: (state, action) => ({
      ...state,
      kakaoBookResult: action.payload.data,
      saveBookList: Array.from({ length: state.size }, (undefined, i) => false),
      isLoading: false,
    }),
  },
  initialState
);

export default book;
