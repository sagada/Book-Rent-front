import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_KAKAO_REQUEST } from "../../modules/book";
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
  const { page, size, target, query } = useSelector((state) => state.book);
  const [serachParam, setSerachParam] = useState();
  const dispatchSearchKakaoBook = () => {
    setSerachParam({
      page: page,
      query: query,
      size: size,
      target: target,
    });
    dispatch({ type: SEARCH_KAKAO_REQUEST, payload: serachParam });
  };

  return (
    <div>
      <br></br>
      <Row>
        <Col span={4}></Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
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
      <button onClick={dispatchSearchKakaoBook}>버튼</button>
    </div>
  );
};

export default Adminsearchbar;
