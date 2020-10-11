import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { SEARCH_KAKAO_REQUEST } from "../../modules/book";
const Paginationbar = ({ pageNumber, cur, total }) => {
  const dispatch = useDispatch();
  const {
    page,
    size,
    target,
    isLoading,
    kakaoBookResult,
    searchParam,
  } = useSelector((state) => state.book);

  const check = (page) => {
    console.log(page);
    dispatch({ type: SEARCH_KAKAO_REQUEST, payload: searchParam });
  };

  return (
    <Pagination
      disable={total !== 0 ? false : true}
      current={pageNumber}
      defaultPageSize={6}
      onChange={check}
      pageSize={6}
      total={total}
    />
  );
};

export default Paginationbar;
