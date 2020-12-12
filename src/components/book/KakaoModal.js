import { Modal, Button, Table, Tag, Space, Alert } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModalState, SAVE_KAKAO_REQUEST } from "../../modules/book";
import { columns } from "../../Utils/KakaoSaveBooksdats";
function KakaoModal() {
  const dispatch = useDispatch();
  const [innerModalContents, setInnerModalContents] = useState();
  const { isBookModalOpen, saveBookListParam, saveBookIsSuccess } = useSelector(
    (state) => state.book
  );
  const handleModalState = () => {
    dispatch(changeModalState(!isBookModalOpen));
  };

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
        key: i,
        name: saveBookListParam[i].kakaoBook.title,
        publisher: saveBookListParam[i].kakaoBook.publisher,
        price: saveBookListParam[i].kakaoBook.price,
        thumbnail: saveBookListParam[i].kakaoBook.thumbnail,
      };
      modalState.push(p);
    }
    setInnerModalContents(modalState);
  }, [isBookModalOpen]);

  return (
    <Modal
      width={1500}
      title="입고하기"
      visible={isBookModalOpen}
      onOk={requestKakaoBook}
      onCancel={handleModalState}
    >
      {saveBookIsSuccess ? (
        <Alert message="Success Text" type="success" closable />
      ) : null}
      <Table columns={columns} dataSource={innerModalContents} />
    </Modal>
  );
}
export default KakaoModal;
