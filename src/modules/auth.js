import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import produce from "immer";
import { loginApi, registerApi } from "../api/auth";
import { ActionTypes } from "../Utils/ActionTypes";
export const CHANGE_FIELD = "auth/CHANGE_FIELD";
export const INIT_STATE = "auth/INIT_STATE";
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // 키값
    value, // 실제 값
  })
);
export const [
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
] = ActionTypes("auth/REGISTER");

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = ActionTypes(
  "auth/LOGIN"
);

export const initializeForm = createAction(INIT_STATE, (form) => form); // register, login

export const login = createAction(LOGIN_REQUEST, ({ email, password }) => ({
  email,
  password,
}));

export const register = createAction(
  REGISTER_REQUEST,
  ({ email, password, nickname }) => ({
    email,
    nickname,
    password,
  })
);

function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: error,
    });
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(registerApi, action.payload);
    console.log("registerSaga", response);
    yield put({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: error,
    });
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

const initialState = {
  register: {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  },

  login: {
    email: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [INIT_STATE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },

  initialState
);

export default auth;
