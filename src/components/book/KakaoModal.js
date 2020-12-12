import { Modal, Button, Table, Tag, Space, Alert } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeModalState,
  SAVE_KAKAO_REQUEST,
  deleteSaveBookParamByIdx,
} from "../../modules/book";
import { InputNumber, Image } from "antd";
function KakaoModal() {
  const dispatch = useDispatch();
  const [innerModalContents, setInnerModalContents] = useState();
  const { isBookModalOpen, saveBookListParam, saveBookIsSuccess } = useSelector(
    (state) => state.book
  );
  const handleModalState = () => {
    dispatch(changeModalState(!isBookModalOpen));
  };

  const handleDeleteSaveBookItemk = (idx) => {
    console.log(idx.key);
    let newParamList = [];
    let newModalList = [];

    for (let i = 0; i < innerModalContents.length; i++) {
      if (idx.key != innerModalContents[i].key) {
        newModalList.push(innerModalContents[i]);
      }
    }
    for (let i = 0; i < saveBookListParam.length; i++) {
      if (idx.key != saveBookListParam[i].key) {
        newParamList.push(saveBookListParam[i]);
      }
    }
    setInnerModalContents(newModalList);
    dispatch(deleteSaveBookParamByIdx(newParamList));
  };
  const columns = [
    {
      title: "이미지",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <>
          <Image width={90} src={thumbnail} />
        </>
      ),
    },
    {
      title: "책 이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "출판사",
      dataIndex: "publisher",
      key: "publisher",
      colSpan: 1,
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "입고수량",
      key: "action",
      render: (text, record) => (
        <InputNumber
          size="large"
          min={1}
          max={80}
          defaultValue={1}
          // onChange={onChange}
        />
      ),
    },
    {
      title: "",
      key: "cancel",
      render: (idx) => (
        <Tag onClick={() => handleDeleteSaveBookItemk(idx)} color="magenta">
          취소
        </Tag>
      ),
    },
  ];
  const requestKakaoBook = () => {
    let requestParam = [];

    saveBookListParam.forEach((ele) => {
      let isbns = ele.kakaoBook.isbn.trim().split(" ");

      let p = {
        name: ele.kakaoBook.title,
        publisher: ele.kakaoBook.publisher,
        isbn: isbns[0].trim(),
        count: 100,
        imgUrl: ele.kakaoBook.thumbnail,
        author: ele.kakaoBook.authors[0],
      };
      requestParam.push(p);
    });

    dispatch({ type: SAVE_KAKAO_REQUEST, payload: requestParam });
  };

  useEffect(() => {
    let modalState = [];

    for (let i = 0; i < saveBookListParam.length; i++) {
      let p = {
        key: saveBookListParam[i].key,
        name: saveBookListParam[i].kakaoBook.title,
        publisher: saveBookListParam[i].kakaoBook.publisher,
        price: saveBookListParam[i].kakaoBook.price,
        thumbnail: saveBookListParam[i].kakaoBook.thumbnail,
        cancel: i,
      };
      modalState.push(p);
    }
    setInnerModalContents(modalState);
  }, [isBookModalOpen]);

  return (
    <Modal
      width={1500}
      title="입고 리스트"
      visible={isBookModalOpen}
      onOk={requestKakaoBook}
      onCancel={handleModalState}
      okText={"입고"}
      cancelText={"취소"}
    >
      {saveBookIsSuccess ? (
        <Alert message="Success Text" type="success" closable />
      ) : null}
      <Table
        size="small"
        columns={columns}
        dataSource={innerModalContents}
        pagination={false}
      />
    </Modal>
  );
}
export default KakaoModal;
