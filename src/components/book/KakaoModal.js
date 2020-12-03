import { Modal, Button, Table, Tag, Space, Alert } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModalState, SAVE_KAKAO_REQUEST } from "../../modules/book";
import { columns } from "../../Utils/KakaoSaveBooksdats";
function KakaoModal() {
  const dispatch = useDispatch();
  const { isBookModalOpen, saveBookListParam, saveBookIsSuccess } = useSelector(
    (state) => state.book
  );
  const handleModalState = () => {
    dispatch(changeModalState(!isBookModalOpen));
  };

  const saveKakakoBook = () => {
    let requestParam = [];
    saveBookListParam.forEach((ele) => {
      let isbns = ele.isbn.split(" ");
      let p = {
        name: ele.title,
        publisher: ele.publisher,
        isbn: isbns[0].trim(),
        count: 100,
        imgUrl: ele.thumbnail,
        author: ele.authors[0],
      };
      requestParam.push(p);
    });
    dispatch({ type: SAVE_KAKAO_REQUEST, payload: requestParam });
  };
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <Modal
      title="Basic Modal"
      visible={isBookModalOpen}
      onOk={saveKakakoBook}
      onCancel={handleModalState}
    >
      {saveBookIsSuccess ? (
        <Alert message="Success Text" type="success" closable />
      ) : null}
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
}
export default KakaoModal;
