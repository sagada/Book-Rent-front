import {createAction, handleActions} from "redux-actions";
import {call, put, takeLatest} from "redux-saga/effects";
import {ActionTypes} from "../Utils/ActionTypes";

import {searchSavedBookApi} from "../lib/savedBook";

export const [
    SEARCH_SAVED_BOOK_REQUEST,
    SEARCH_SAVED_BOOK_SUCCESS,
    SEARCH_KAKAO_BOOK_FAILURE,
] = ActionTypes("savebook/SEARCH_SAVED_BOOK");

const initialState = {
    saveBookResult: null,
    isLoading: false,
};

function* searchSavedBook(action) {
    console.log("action", action);
    try {
        const response = yield call(searchSavedBookApi, action.payload);
        console.log("response :", response);
        yield put({
            type: SEARCH_SAVED_BOOK_SUCCESS,
            payload: response,
        });
    } catch (e) {
        yield put({
            type: SEARCH_KAKAO_BOOK_FAILURE,
            payload: e,
            error: true,
        });
    }
}

export function* saveBookSaga() {
    yield takeLatest(SEARCH_SAVED_BOOK_REQUEST, searchSavedBook);
}

const savebook = handleActions(
    {
        [SEARCH_SAVED_BOOK_REQUEST]: (state, action) => ({
            ...state,
            isLoading: true,
        }),
        [SEARCH_SAVED_BOOK_SUCCESS]: (state, action) => ({
            ...state,
            saveBookResult: action.payload.data,
            isLoading: false,
        }),
    },
    initialState
);

export default savebook;
