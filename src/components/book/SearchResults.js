import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Empty } from "antd";
import Paginationbar from "./Paginationbar";
const SearchResults = () => {
  const { Meta } = Card;
  const { page, size, target, kakaoBookResult } = useSelector(
    (state) => state.book
  );

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <br></br>
      <br></br>
      <br></br>
      {kakaoBookResult != null && kakaoBookResult.documents.length == 0 && (
        <Row justify="center" align="center" gutter={16}>
          <br></br>
          <br></br> <Empty></Empty>
        </Row>
      )}
      <Row justify="center" align="center" gutter={16}>
        {kakaoBookResult != null &&
          kakaoBookResult.documents.slice(0, 3).map((book, idx) => {
            return (
              <Col span={8} key={idx}>
                <Card
                  size="small"
                  key={idx}
                  hoverable
                  style={{ width: "50%", margin: "auto" }}
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
          kakaoBookResult.documents.slice(3, 6).map((book, idx) => {
            return (
              <Col span={8} key={idx}>
                <Card
                  key={idx}
                  size="small"
                  hoverable
                  style={{ width: "50%", margin: "auto" }}
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
      <Row justify="center">
        {kakaoBookResult != null && kakaoBookResult.documents.length !== 0 && (
          <Paginationbar
            page={page}
            size={size}
            total={kakaoBookResult.meta.pageable_count}
          />
        )}
      </Row>
    </div>
  );
};

export default SearchResults;
