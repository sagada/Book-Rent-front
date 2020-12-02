import { createAction, handleActions } from "redux-actions";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../Utils/ActionTypes";

import {
  searchKakaoBook,
  getBookCountByIsbnArr,
  saveKakaoBook,
} from "../lib/book";

export const [
  SEARCH_KAKAO_REQUEST,
  SEARCH_KAKAO_SUCCESS,
  SEARCH_KAKAO_FAILURE,
] = ActionTypes("book/SEARCH_KAKAO_BOOK");

export const [
  SAVE_KAKAO_REQUEST,
  SAVE_KAKAO_SUCCESS,
  SAVE_KAKAO_FAILURE,
] = ActionTypes("book/SAVE_KAKAO_BOOK");

export const CHANGE_SAVE_BOOK_FLAG = "CHANGE_SAVE_BOOK_FLAG";
export const CHANGE_FALG_LIST_INDEX = "CHANGE_FALG_LIST_INDEX";
export const CHANGE_MODAL_STATE = "CHANGE_MODAL_STATE";
export const CHANGE_TARGET = "CHANGE_TARGET";
export const CHANGE_QUERY = "CHANGE_QUERY";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const SET_SAVE_BOOK_LIST = "SAVE_BOOK_LIST";
export const MODAL_OPEN = "MODAL_OPEN";
export const CONCAT_BOOK_ISBN = "CONCAT_BOOK_ISBN";
export const OFF_SAVE_KAKAO_BOOK_SUCCESS_ALERT =
  "OFF_SAVE_KAKAO_BOOK_SUCCESS_ALERT";
// 카카오 책 저장

export const setSaveBookList = createAction(
  SET_SAVE_BOOK_LIST,
  (param) => param
);
export const chagneFlagListIndex = createAction(
  CHANGE_FALG_LIST_INDEX,
  (idx) => idx
);
export const changeSaveBookFlag = createAction(
  CHANGE_SAVE_BOOK_FLAG,
  (flag) => flag
);

export const concatBookIsbn = createAction(CONCAT_BOOK_ISBN, (param) => param);

export const changeModalState = createAction(CHANGE_MODAL_STATE, (s) => s);
export const changePage = createAction(CHANGE_PAGE, (page) => page);
export const changeQuery = createAction(CHANGE_QUERY, (query) => query);
export const changeTarget = createAction(CHANGE_TARGET, (target) => target);

export const setModalOpen = createAction(MODAL_OPEN);
export const offSuccessKakakoSaveAlert = createAction(
  OFF_SAVE_KAKAO_BOOK_SUCCESS_ALERT
);
export const searchKakaoBookRequest = createAction(
  SEARCH_KAKAO_REQUEST,
  (param) => param
);

function* saveKakaoBookSaga(action) {
  console.log("saveKakaoBook action", action);
  try {
    console.log("saveKakaoBook api call");
    const response = yield call(saveKakaoBook, action.payload);
    console.log("response :", response);
    yield put({
      type: SAVE_KAKAO_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: SAVE_KAKAO_FAILURE,
      payload: e,
      error: true,
    });
  }
}

function* getKakaoBook(action) {
  console.log("getKakaoBook action", action);
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

function* getBookCount(action) {
  console.log("action", action);

  // try{
  //   const response = yield call(getBookCountByIsbnArr, action.payload);
  //   console.log('book count by isbn response :' , response)
  //   yield put({
  //     type :
  //   });
  // }catch(e)
  // {

  // }
}

function* getKakaoSavedBooks(action) {
  console("getKakaoSavedBooks", action);
  try {
    const response = yield call();
  } catch (e) {}
}
export function* bookSaga() {
  yield takeLatest(SEARCH_KAKAO_REQUEST, getKakaoBook);
  yield takeLatest(SAVE_KAKAO_REQUEST, saveKakaoBookSaga);
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
  isBookModalOpen: false,
  saveBookListParam: [],
  modalOpen: false,
  concatIsbnParam: null,
  saveBookIsSuccess: false,
};

const book = handleActions(
  {
    [OFF_SAVE_KAKAO_BOOK_SUCCESS_ALERT]: (state, action) => ({
      ...state,
      saveBookIsSuccess: false,
    }),
    [SAVE_KAKAO_REQUEST]: (state, action) => ({
      ...state,
    }),
    [SAVE_KAKAO_SUCCESS]: (state, action) => ({
      ...state,
      isBookModalOpen: false,
      saveBookIsSuccess: true,
    }),
    [CONCAT_BOOK_ISBN]: (state, action) => ({
      ...state,
      concatIsbnParam: action.payload,
    }),
    [CHANGE_MODAL_STATE]: (state, action) => ({
      ...state,
      isBookModalOpen: action.payload,
    }),
    [CHANGE_FALG_LIST_INDEX]: (state, action) => ({
      ...state,
      saveBookList: [
        ...state.saveBookList.slice(0, action.payload),
        !state.saveBookList[action.payload],
        ...state.saveBookList.slice(action.payload + 1),
      ],
    }),
    [MODAL_OPEN]: (state, action) => ({
      ...state,
      modalOpen: !state.modalOpen,
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
      isBookModalOpen: false,
      saveBookListParam: [],
      kakaoBookResult: null,
      modalOpen: false,
    }),

    [SEARCH_KAKAO_SUCCESS]: (state, action) => ({
      ...state,
      kakaoBookResult: action.payload.data,
      saveBookList: Array.from({ length: state.size }, (undefined, i) => false),
      isLoading: false,
      saveBookFlag: false,
    }),
    [SET_SAVE_BOOK_LIST]: (state, action) => ({
      ...state,
      saveBookListParam: action.payload,
    }),
  },
  initialState
);

export default book;
