import { Modal, Button, Table, Tag, Space } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModalState } from "../../modules/book";
import { columns } from "../../Utils/KakaoSaveBooksdats";
function KakaoModal() {
  const dispatch = useDispatch();
  const { isBookModalOpen, saveBookListParam } = useSelector(
    (state) => state.book
  );
  const handleModalState = () => {
    dispatch(changeModalState(!isBookModalOpen));
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
      //   onOk={this.handleOk}
      onCancel={handleModalState}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
}
export default KakaoModal;
