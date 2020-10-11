import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "antd";
import Paginationbar from "./Paginationbar";
const SearchResults = () => {
  const { Meta } = Card;
  const [pageNumber, setPageNumber] = useState(1);
  const { page, size, target, isLoading, kakaoBookResult } = useSelector(
    (state) => state.book
  );
  const handlePage = (e) => {
    setPageNumber();
  };
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <br></br>
      <br></br>
      <br></br>
      <Row justify="center" align="top" gutter={16}>
        {kakaoBookResult != null &&
          kakaoBookResult.documents.slice(0, 3).map((book, idx) => {
            return (
              <>
                <Col span={8}>
                  <Card
                    size="small"
                    hoverable
                    style={{ width: "50%", margin: "auto" }}
                    cover={<img alt="example" src={book.thumbnail} />}
                  >
                    <Meta title={book.title} description={book.publisher} />
                  </Card>
                </Col>
              </>
            );
          })}
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <Row justify="center" align="top" gutter={16}>
        {kakaoBookResult != null &&
          kakaoBookResult.documents.slice(3, 6).map((book, idx) => {
            return (
              <>
                <Col span={8}>
                  <Card
                    size="small"
                    hoverable
                    style={{ width: "50%", margin: "auto" }}
                    cover={<img alt="example" src={book.thumbnail} />}
                  >
                    <Meta title={book.title} description={book.publisher} />
                  </Card>
                </Col>
              </>
            );
          })}
      </Row>
      {kakaoBookResult != null && kakaoBookResult.documents.length !== 0 && (
        <Paginationbar
          page={page}
          total={kakaoBookResult.meta.pageable_count}
        />
      )}
    </div>
  );
};

export default SearchResults;
