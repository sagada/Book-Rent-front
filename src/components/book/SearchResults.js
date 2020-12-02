import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Empty } from "antd";
import Paginationbar from "./Paginationbar";
import {
  changeSaveBookFlag,
  chagneFlagListIndex,
  kakaoBookSave,
} from "../../modules/book";
import KakaoBookSearchRow from "./KakaoBookSearchRow";
const SearchResults = () => {
  const dispatch = useDispatch();
  const [leni, setLeni] = useState(0);
  const { Meta, Grid } = Card;
  const [len, setLen] = useState(0);
  const [cardLoading, setCardLoading] = useState(false);
  const {
    page,
    size,
    target,
    kakaoBookResult,
    saveBookFlag,
    saveBookList,
  } = useSelector((state) => state.book);

  const handleFlag = (e) => {
    console.log("index ", e, " 가 클릭되었습니다.");
    dispatch(chagneFlagListIndex(e));
  };

  const handleLoading = () => {
    setCardLoading(!cardLoading);
  };
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <br></br>
      <br></br>
      <br></br>
      {kakaoBookResult != null && kakaoBookResult.documents.length == 0 && (
        <Row justify="center" align="center" gutter={16}>
          <br></br>
          <br></br>
          <Empty description="검색결과가 없습니다." />
        </Row>
      )}

      <KakaoBookSearchRow rowIndex={0} colSize={4} />
      <br></br>
      <KakaoBookSearchRow rowIndex={4} colSize={8} />

      <br></br>
      {kakaoBookResult != null && kakaoBookResult.documents.length !== 0 && (
        <Row justify="center">
          <Paginationbar total={kakaoBookResult.meta.pageable_count / size} />
        </Row>
      )}
    </div>
  );
};

export default SearchResults;
