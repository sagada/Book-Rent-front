import { Tag, Space, InputNumber, Image } from "antd";
import React from "react";

export const columns = [
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
      <InputNumber size="large" min={1} max={80} defaultValue={1} />
    ),
  },
];
