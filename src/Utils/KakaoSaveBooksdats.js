import { Tag, Space, InputNumber } from "antd";
import React from "react";

export const columns = [
  {
    title: "책 이미지",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "책 이름",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "가격",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "현재 보유 재고수",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "수량",
    key: "action",
    render: (text, record) => (
      <InputNumber
        size="large"
        min={1}
        max={100}
        defaultValue={1}
        // onChange={onChange}
      />
    ),
  },
];
