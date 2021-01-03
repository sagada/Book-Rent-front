import React, { useEffect } from "react";
import { Table, Tag, Space, Divider, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "이미지",
    dataIndex: "0",
    key: "imgUrl",
    render: (url) => (
      <>
        <Image width={90} src={url} />
      </>
    ),
  },
  {
    title: "책 이름",
    dataIndex: "1",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "책 수량",
    dataIndex: "2",
    key: "count",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "출판사",
    dataIndex: "3",
    key: "publisher",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "저자",
    dataIndex: "4",
    key: "author",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "상태",
    dataIndex: "5",
    key: "status",
  },
  {
    title: "등록일",
    key: "status",
    dataIndex: "6",
    render: (text) => <>{text}</>,
  },
  {
    title: "주문 ID",
    key: "orderId",
    dataIndex: "7",
    render: (text) => <>{text}</>,
  },
];

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

const SavedBookResult = () => {
  const dispatch = useDispatch();
  // useEffect(() => {}, [saveBookResult]);
  const { saveBookResult } = useSelector((state) => state.savebook);
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px",
        width: "90%",
      }}
    >
      <Table
        columns={columns}
        dataSource={saveBookResult == null ? null : saveBookResult}
      />
    </div>
  );
};

export default SavedBookResult;
