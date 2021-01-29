import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "antd";
import {SEARCH_KAKAO_REQUEST, changePage} from "../../modules/book";

const Paginationbar = ({total}) => {
    const dispatch = useDispatch();
    const {page, size, target, isLoading, kakaoBookResult, query} = useSelector(
        (state) => state.book
    );

    const check = (pageNum) => {
        dispatch(changePage(pageNum));
        const param = {
            page: pageNum,
            size: size,
            target: target,
            query: query,
        };

        dispatch({type: SEARCH_KAKAO_REQUEST, payload: param});
    };

    return (
        <Pagination current={page} onChange={check} pageSize={size} total={total}/>
    );
};

export default Paginationbar;
