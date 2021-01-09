import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Radio,
  Select,
  DatePicker,
  Image,
  Col,
  Tag,
  Row,
  Pagination,
  Input,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GET_ORDER_LIST_REQUEST } from "../../modules/order";
const OrderResult = () => {
  const { orderResult, isLoading, outerOrderResult } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState();
  const [orderDate, setOrderDate] = useState();
  const [startDt, setStartDt] = useState();
  const [endDt, setEndDt] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  const { Option, OptGroup } = Select;
  const [searchPageSize, setSearchPageSize] = useState(3);
  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const [outerData, setOuterData] = useState();
  const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );
  const handleChangeOrderId = (e) => {
    setOrderId(e.target.value);
  };
  const orderSearch = () => {
    const param = {
      orderId: orderId,
      orderDate: orderDate,
      startDt: startDt,
      endDt: endDt,
      orderStatus: orderStatus,
      size: searchPageSize,
      page: searchPageNumber,
    };
    dispatch({ type: GET_ORDER_LIST_REQUEST, payload: param });
  };
  const handlePickDate = (date, dateString) => {
    let s = dateString[0].substring(0, 10);
    let e = dateString[1].substring(0, 10);
    setStartDt(s + " 00:00:00");
    setEndDt(e + " 00:00:00");
  };
  const handlePaging = (page, pageSize) => {
    setSearchPageNumber(page - 1);
    setSearchPageSize(pageSize);

    const param = {
      orderId: orderId,
      orderDate: orderDate,
      startDt: startDt,
      endDt: endDt,
      orderStatus: orderStatus,
      size: searchPageSize,
      page: page - 1,
    };

    dispatch({ type: GET_ORDER_LIST_REQUEST, payload: param });
  };
  const handleOrderStatus = (a) => {
    if (a.target.value == "ALL") {
      setOrderStatus();
      return;
    }

    setOrderStatus(a.target.value);
  };

  const incolumns = [
    {
      title: "책 이미지",
      key: "imgUrl",
      dataIndex: "imgUrl",
      render: (imgUrl) => (
        <>
          <Image width={90} src={imgUrl} />
        </>
      ),
    },
    { title: "책 ID", dataIndex: "bookId", key: "bookId" },
    { title: "책 이름", dataIndex: "bookName", key: "bookName" },
    {
      title: "책 상태",
      key: "bookStatus",
      render: () => (
        <span>
          <Badge status="processing" />
          입고중
        </span>
      ),
    },
    { title: "주문 수량", dataIndex: "quantity", key: "quantity" },
    { title: "ISBN", dataIndex: "isbn", key: "booisbnkName" },
    { title: "저자", dataIndex: "author", key: "author" },
    { title: "출판사", dataIndex: "publisher", key: "publisher" },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: () => (
        <Space size="middle">
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown overlay={menu}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const columns = [
    { title: "주문 ID", dataIndex: "orderId", key: "orderId" },
    { title: "주문 날짜", dataIndex: "orderAt", key: "orderAt" },
    { title: "상태", dataIndex: "orderStatus", key: "orderStatus" },
    { title: "주문 개수", dataIndex: "rangeCount", key: "rangeCount" },
    { title: "책 개수", dataIndex: "totalCount", key: "totalCount" },
    { title: "", key: "operation", render: () => <a>Publish</a> },
  ];

  useEffect(() => {
    let data = [];

    if (orderResult != null) {
      for (let i = 0; i < orderResult.content.length; ++i) {
        let ina = orderResult.content[i];
        let iData = [];
        for (let j = 0; j < ina.orderBookDtoList.length; j++) {
          iData.push({
            key: j,
            bookId: ina.orderBookDtoList[j].bookId,
            bookName: ina.orderBookDtoList[j].bookName,
            bookStatus: ina.orderBookDtoList[j].bookStatus,
            quantity: ina.orderBookDtoList[j].quantity,
            isbn: ina.orderBookDtoList[j].isbn,
            author: ina.orderBookDtoList[j].author,
            publisher: ina.orderBookDtoList[j].publisher,
            imgUrl: ina.orderBookDtoList[j].imgUrl,
          });
        }
        data.push({
          key: i,
          orderId: orderResult.content[i].orderId,
          orderAt: orderResult.content[i].orderDate,
          rangeCount: 1,
          totalCount: 1,
          orderStatus: orderResult.content[i].orderStatus,
          bookList: iData,
        });
      }
      setOuterData(data);
    }
  }, [orderResult]);

  return (
    <>
      <Row style={{ marginTop: "30px" }}>
        <Col span={3}></Col>
        <Col span={1}></Col>
        <Col span={1}>
          <Tag color="geekblue">주문 ID</Tag>
        </Col>
        <Col span={6}>
          <Search
            placeholder="주문 ID 입력"
            onSearch={orderSearch}
            onChange={handleChangeOrderId}
            value={orderId}
            loading={isLoading}
            enterButton
          />
        </Col>
        <Col span={12} style={{ margin: "auto" }}>
          <Tag color="geekblue">입고 날짜 검색</Tag>
          <Space>
            <RangePicker
              defaultValue={new Date()}
              onCalendarChange={handlePickDate}
            />
          </Space>
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col span={3}></Col>
        <Col span={12}>
          <Tag color="geekblue">입고 상태</Tag>
          <Radio.Group
            defaultValue="ALL"
            buttonStyle="solid"
            onChange={handleOrderStatus}
          >
            <Radio.Button value="ALL">전체</Radio.Button>
            <Radio.Button value="READY">입고중</Radio.Button>
            <Radio.Button value="COMPLETE">입고완료</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Table
        style={{
          marginTop: "50px",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        tableLayout={true}
        bordered={true}
        className="test"
        columns={columns}
        expandable={{
          expandedRowRender: (outerOrderResult) => (
            <Table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "40px",
                marginBottom: "40px",
                height: "100%",
                width: "98%",
              }}
              bordered={true}
              columns={incolumns}
              dataSource={outerOrderResult.bookList}
              pagination={false}
            />
          ),
          rowExpandable: (outerOrderResult) => outerOrderResult != null,
        }}
        dataSource={outerData}
        pagination={false}
      />

      <Row
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
      >
        {orderResult != null ? (
          <>
            <Pagination
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "40px",
              }}
              current={searchPageNumber + 1}
              pageSize={searchPageSize}
              total={orderResult.totalElements}
              onChange={handlePaging}
            />
          </>
        ) : null}
      </Row>
    </>
  );
};
export default OrderResult;
