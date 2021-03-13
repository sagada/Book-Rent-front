import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Radio,
  Button,
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
import {
  GET_ORDER_LIST_REQUEST,
  MODIFY_ORDER_ID,
  MODIFY_ORDER_REQUEST,
  DELETE_ORDER_BOOK_REQUEST,
} from "../../modules/order";

const OrderResult = () => {
  const { orderResult, isLoading, modifyOrderId } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState();
  const [startDt, setStartDt] = useState();
  const [endDt, setEndDt] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  const { Option, OptGroup } = Select;
  const [searchPageSize, setSearchPageSize] = useState(6);
  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const [outerData, setOuterData] = useState();

  const handleVisibleChange = (e) => {
    dispatch({ type: MODIFY_ORDER_ID, payload: e });
  };
  const handleMenuClick = (e) => {
    const searchParam = {
      orderId: orderId,
      startDt: startDt,
      endDt: endDt,
      orderStatus: orderStatus,
      size: searchPageSize,
      page: searchPageNumber,
    };

    let status = "";
    if (e.key === "1") {
      status = "CANCEL";
    } else {
      status = "COMPLETE";
    }

    const param = {
      search: searchParam,
      orderId: modifyOrderId,
      status: status,
    };

    dispatch({ type: MODIFY_ORDER_REQUEST, payload: param });
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">주문 취소</Menu.Item>
      <Menu.Item key="2">주문 완료</Menu.Item>
    </Menu>
  );

  const handleChangeOrderId = (e) => {
    setOrderId(e.target.value);
  };

  const orderSearch = () => {
    const param = {
      orderId: orderId,
      startDt: startDt,
      endDt: endDt,
      orderStatus: orderStatus,
      size: searchPageSize,
      page: 0,
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
  const handleDeleteOrderBook = (e) => {
    console.log(e);
    const searchParam = {
      orderId: orderId,
      startDt: startDt,
      endDt: endDt,
      orderStatus: orderStatus,
      size: searchPageSize,
      page: searchPageNumber,
    };

    const param = {
      search: searchParam,
      orderBookId: e,
    };

    dispatch({ type: DELETE_ORDER_BOOK_REQUEST, payload: param });
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
    {
      title: "책 ID",
      dataIndex: "bookId",
      key: "bookId",
      render: (bookId) => {
        return <Tag color="black">{bookId}</Tag>;
      },
    },
    {
      title: "주문 책 ID",
      dataIndex: "orderBookId",
      key: "orderBookId",
      render: (text) => <></>,
    },
    { title: "책 이름", dataIndex: "bookName", key: "bookName" },
    {
      title: "책 상태",
      key: "bookStatus",
      dataIndex: "bookStatus",
      render: (status) => {
        let color = "blue";

        let representStatus = "입고대기";
        if (status == "COMP") {
          representStatus = "대여 가능";
          color = "orange";
        } else if (status == "CANCEL") {
          representStatus = "입고취소";
          color = "green";
        }
        return <Tag color={color}>{representStatus}</Tag>;
      },
    },
    { title: "주문 수량", dataIndex: "quantity", key: "quantity" },
    { title: "ISBN", dataIndex: "isbn", key: "booisbnkName" },
    { title: "저자", dataIndex: "author", key: "author" },
    { title: "출판사", dataIndex: "publisher", key: "publisher" },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDeleteOrderBook(record.orderBookId)}>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  const columns = [
    {
      title: "주문 ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (orderId) => {
        return <Tag color="black">{orderId}</Tag>;
      },
    },
    {
      title: "주문 날짜",
      dataIndex: "orderAt",
      key: "orderAt",
      render: (date) => {
        return <Tag color="blue">{date}</Tag>;
      },
    },
    {
      title: "주문 상태",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        let color = "red";
        if (status === "READY") {
          status = "주문 중";
          color = "cyan";
        } else if (status == "COMPLETE") {
          color = "geekblue";
          status = "주문 완료";
        } else if (status == "CANCEL") {
          status = "주문 취소";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "책 개수",
      dataIndex: "totalCount",
      key: "totalCount",
      render: (ct) => {
        return <Tag color="blue">{ct}</Tag>;
      },
    },

    {
      title: "주문 Email",
      dataIndex: "regNm",
      key: "regnm",
      render: (ct) => {
        return <Tag color="blue">{ct}</Tag>;
      },
    },

    {
      title: "수정",
      key: "action",
      render: (text, record) => {
        if (record.orderStatus != "READY") {
          return (
            <Button
              danger
              type="primary"
              disabled={record.orderStatus != "READY"}
            >
              완료
            </Button>
          );
        } else {
          return (
            <Dropdown
              overlay={menu}
              onVisibleChange={() => handleVisibleChange(record.orderId)}
            >
              <Button
                danger
                type="primary"
                disabled={record.orderStatus != "READY"}
              >
                수정하기
                <DownOutlined>
                  <DownOutlined />
                </DownOutlined>
              </Button>
            </Dropdown>
          );
        }
      },
    },
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
            orderBookId: ina.orderBookDtoList[j].orderBookId,
          });
        }

        data.push({
          key: i,
          orderId: orderResult.content[i].orderId,
          regNm: orderResult.content[i].memberNm,
          orderAt: orderResult.content[i].orderDate,
          totalCount: orderResult.content[i].orderBookDtoList.length,
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
        <Col span={4}></Col>
        <Col span={1}>
          <Tag color="blue">주문 ID</Tag>
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
          <Tag color="blue">입고 날짜 검색</Tag>
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
          <Tag color="blue">입고 상태</Tag>
          <Radio.Group
            defaultValue="ALL"
            buttonStyle="solid"
            onChange={handleOrderStatus}
          >
            <Radio.Button value="ALL">전체</Radio.Button>
            <Radio.Button value="READY">주문 중</Radio.Button>
            <Radio.Button value="COMPLETE">주문 완료</Radio.Button>
            <Radio.Button value="CANCEL">주문 취소</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {orderResult != null ? (
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
      ) : null}
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
