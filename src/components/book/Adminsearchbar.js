import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_KAKAO_REQUEST, CHANGE_QUERY } from "../../modules/book";
import { Input, Row, Col, Select } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Search } = Input;
const { Option, OptGroup } = Select;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const Adminsearchbar = () => {
  const dispatch = useDispatch();
  const { page, size, query, isLoading } = useSelector((state) => state.book);

  const dispatchSearchKakaoBook = () => {
    const param = {
      page: page,
      size: size,
      query: query,
    };
    dispatch({ type: SEARCH_KAKAO_REQUEST, payload: param });
  };

  const handleSearch = (e) => {
    dispatch({ type: CHANGE_QUERY, payload: e.target.value });
    console.log(e.target.value);
  };
  return (
    <div>
      <br></br>
      <Row>
        <Col span={4}></Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            onSearch={dispatchSearchKakaoBook}
            onChange={handleSearch}
            loading={isLoading}
            enterButton
          />
        </Col>
        <Col span={1}></Col>
        <Col span={8}>
          <Select defaultValue="책 이름" style={{ width: 130 }}>
            <OptGroup label="검색 유형">
              <Option value="book_name">책 이름</Option>
              <Option value="book_author">책 저자</Option>
              <Option value="book_isbn">ISBN</Option>
            </OptGroup>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default Adminsearchbar;
