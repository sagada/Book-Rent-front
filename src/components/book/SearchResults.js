import React from "react";
import { useSelector } from "react-redux";
import { Row, Empty, Divider } from "antd";
import Paginationbar from "./Paginationbar";
import KakaoBookSearchRow from "./KakaoBookSearchRow";

const SearchResults = () => {
  const { size, kakaoBookResult } = useSelector((state) => state.book);

  return (
    <div
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "100px",
      }}
    >
      {kakaoBookResult != null && kakaoBookResult.documents.length == 0 && (
        <>
          <Divider
            orientation="left"
            style={{ marginBottom: "80px", marginTop: "80px" }}
          />
          <Row justify="center" align="center" gutter={16}>
            <br></br>
            <br></br>
            <Empty description="검색결과가 없습니다." />
          </Row>
        </>
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
