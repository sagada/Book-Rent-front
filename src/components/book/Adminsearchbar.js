import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_KAKAO_REQUEST,
  changeQuery,
  changeTarget,
  changeSaveBookFlag,
} from "../../modules/book";
import { Input, Row, Col, Select, Button } from "antd";
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
  const {
    page,
    size,
    query,
    target,
    isLoading,
    kakaoBookResult,
    saveBookFlag,
    saveBookList,
  } = useSelector((state) => state.book);

  const dispatchSearchKakaoBook = () => {
    const param = {
      page: page,
      size: size,
      query: query,
      target: target,
    };
    dispatch({ type: SEARCH_KAKAO_REQUEST, payload: param });
  };

  const handleSearch = (e) => {
    dispatch(changeQuery(e.target.value));
    console.log(e.target.value);
  };

  const handleSelectBox = (e) => {
    dispatch(changeTarget(e));
    console.log(e);
  };

  const handelSaveBookFlag = () => {
    dispatch(changeSaveBookFlag(!saveBookFlag));
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
          <Select
            defaultValue="책 이름"
            style={{ width: 130 }}
            onChange={handleSelectBox}
          >
            <OptGroup label="검색 유형">
              <Option value="title">책 이름</Option>
              <Option value="person">책 저자</Option>
              <Option value="publisher">출판사</Option>
              <Option value="isbn">ISBN</Option>
            </OptGroup>
          </Select>
        </Col>
      </Row>
      <br></br>
      {kakaoBookResult != null && kakaoBookResult.documents.length !== 0 && (
        <Row justify="end">
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}>
            <Button
              onClick={handelSaveBookFlag}
              ghost={saveBookFlag}
              style={{ margin: "auto" }}
              type="primary"
            >
              {saveBookFlag ? "선택완료" : "입고하기"}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Adminsearchbar;
