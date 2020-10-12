import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Empty } from "antd";
import Paginationbar from "./Paginationbar";
import { changeSaveBookFlag, chagneFlagListIndex } from "../../modules/book";
const SearchResults = () => {
  const dispatch = useDispatch();
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
    console.log(e);
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

      <Row justify="center" align="center" gutter={16}>
        {kakaoBookResult != null &&
          kakaoBookResult.documents.slice(0, size / 2).map((book, idx) => {
            return (
              <Col span={4} key={idx}>
                <Card
                  onClick={() => handleFlag(idx)}
                  size="small"
                  key={idx}
                  hoverable
                  style={{
                    width: "50%",
                    margin: "auto",
                    opacity: saveBookFlag === true ? "0.8" : "1",
                    border:
                      saveBookFlag && saveBookList[idx] === true
                        ? "3px solid rgb(33,139,255)"
                        : null,
                  }}
                  cover={
                    <img
                      alt="example"
                      style={{ width: "95%", margin: "auto" }}
                      src={book.thumbnail}
                    />
                  }
                >
                  <Meta
                    key={idx}
                    title={book.title}
                    description={book.publisher}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <Row justify="center" align="center" gutter={16}>
        {kakaoBookResult != null &&
          kakaoBookResult.documents.slice(size / 2).map((book, idx) => {
            return (
              <Col span={4} key={idx}>
                <Card
                  onClick={() => handleFlag(idx + size)}
                  key={idx}
                  size="small"
                  hoverable
                  style={{
                    width: "50%",
                    margin: "auto",
                    opacity: saveBookFlag === true ? "0.8" : "1",
                    border:
                      saveBookFlag && saveBookList[idx + size] === true
                        ? "3px solid rgb(33,139,255)"
                        : null,
                  }}
                  cover={
                    <img
                      alt="example"
                      style={{ width: "95%", margin: "auto" }}
                      src={book.thumbnail}
                    />
                  }
                >
                  <Meta
                    key={idx}
                    title={book.title}
                    description={book.publisher}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
      <br></br>
      <br></br>
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
