import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Divider, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";

const SavedBookResult = () => {
  const columns = [
    {
      title: "이미지",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => <Image width={90} src={url} />,
    },
    {
      title: "책 이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "출판사",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "저자",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "상태",
      dataIndex: "bookStatus",
      key: "bookStatus",

      render: (status) => {
        let color = "volcano";
        if (status == "RENT") {
          color = "magenta";
        } else if (status == "COMP") {
          color = "geekblue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "주문 ID",
      dataIndex: "orderId",
      key: "orderId",
    },
  ];

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
        dataSource={saveBookResult != null ? saveBookResult : null}
      />
    </div>
  );
};

export default SavedBookResult;
