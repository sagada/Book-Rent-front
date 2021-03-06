import { handleActions, createAction } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../Utils/ActionTypes";

import * as authAPI from "../api/auth";
import { checkApi } from "../api/user";

const TEMP_SET_USER = "user/TEMP_SET_USER"; // 새로고침 이후 임시 로그인 처리

// 회원 정보 확인
export const [CHECK_REQUEST, CHECK_SUCCESS, CHECK_FAILURE] = ActionTypes(
  "user/CHECK"
);

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK_REQUEST);

function* userRequestSaga(action) {
  try {
    const response = yield call(checkApi, action.payload);
    yield put({
      type: CHECK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: CHECK_FAILURE,
      payload: error,
    });
  }
}

export function* userSaga() {
  yield takeLatest(CHECK_REQUEST, userRequestSaga);
}
const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),

    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
  },
  initialState
);
