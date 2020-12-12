import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_KAKAO_REQUEST,
  changeQuery,
  changeTarget,
  changeSaveBookFlag,
  setSaveBookList,
  changeModalState,
  setModalOpen,
  OFF_SAVE_KAKAO_BOOK_SUCCESS_ALERT,
} from "../../modules/book";
import KakaoModal from "./KakaoModal";
import { Input, Row, Col, Select, Button, Divider, Alert } from "antd";
import { AudioOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
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
    isBookModalOpen,
    modalOpen,
    saveBookIsSuccess,
    saveBookListParam,
  } = useSelector((state) => state.book);

  const dispatchSearchKakaoBook = (e) => {
    if (query == "") {
      alert("내용을 입력 해주세요.");
      return;
    }
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
  };

  const handleSelectBox = (e) => {
    dispatch(changeTarget(e));
  };

  const handleModalOpen = () => {
    console.log("handleModalOpen");
    let param = [];

    for (let i = 0; i < saveBookList.length; i++) {
      if (saveBookList[i]) {
        let bd = {
          kakaoBook: kakaoBookResult.documents[i],
          key: i,
        };
        param.push(bd);
      }
    }
    dispatch(setSaveBookList(param));
    dispatch(changeModalState(!isBookModalOpen));
  };

  const offAlert = () => {
    dispatch({ type: OFF_SAVE_KAKAO_BOOK_SUCCESS_ALERT });
  };

  const handelSaveBookFlag = () => {
    dispatch(setModalOpen());
    dispatch(changeSaveBookFlag(!saveBookFlag));
  };

  return (
    <div>
      <br></br>
      <KakaoModal />
      <Row>
        <Col span={4}></Col>
        <Col span={8}>
          <Search
            placeholder="카카오 책 검색을 하여 책 검색"
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
        <Row justify="end" gutter={24}>
          <Col>
            {modalOpen ? (
              <Button
                ghost={modalOpen}
                type="primary"
                onClick={handleModalOpen}
              >
                입고하기
              </Button>
            ) : null}
          </Col>
          <Col span={4}>
            <Button
              onClick={handelSaveBookFlag}
              ghost={saveBookFlag}
              style={{ margin: "auto" }}
              type="primary"
            >
              {saveBookFlag ? "취소하기" : "입고하기"}
            </Button>
          </Col>
          {kakaoBookResult != null && (
            <Divider
              orientation="left"
              style={{ marginBottom: "80px", marginTop: "80px" }}
            />
          )}
        </Row>
      )}

      {saveBookIsSuccess ? (
        <Alert
          message="입고가 완료 되었습니다."
          type="success"
          closable
          onClose={offAlert}
        />
      ) : null}
    </div>
  );
};

export default Adminsearchbar;
