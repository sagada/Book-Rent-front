import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import produce from "immer";
import { loginApi } from "../api/auth";
import { ActionTypes } from "../Utils/ActionTypes";
export const CHANGE_FIELD = "auth/CHANGE_FIELD";
export const INIT_STATE = "auth/INIT_STATE";
export const changeValue = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // 키값
    value, // 실제 값
  })
);

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = ActionTypes(
  "auth/LOGIN"
);

function* loginFunctionSaga(action) {
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
export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginFunctionSaga);
}

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  },

  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
  },

  initialState
);

export default auth;
