import React, {useState, useEffect} from "react";
import {
    DatePicker,
    Table,
    Button,
    Input,
    Row,
    Select,
    Space,
    Col,
    Tag,
    Radio,
    Pagination,
} from "antd";
import SavedBookResult from "./SavedBookResult";
import {useDispatch, useSelector} from "react-redux";

import {SEARCH_SAVED_BOOK_REQUEST} from "../../modules/savebook";

function SavedBook() {
    const {isLoading, saveBookResult} = useSelector((state) => state.savebook);
    const dispatch = useDispatch();
    const {Search} = Input;
    const {RangePicker} = DatePicker;
    const {Option, OptGroup} = Select;
    const [searchParam, setSearchParam] = useState();
    const [bookTypeParam, setBookTypeParam] = useState("TITLE");
    const [bookStatusParam, setBookStatusParam] = useState("ALL");
    const [startDt, setStartDt] = useState("1000-01-01 00:00:00");
    const [endDt, setEndDt] = useState("3000-01-01 00:00:00");
    const [searchPageSize, setSearchPageSize] = useState(6);
    const [searchPageNumber, setSearchPageNumber] = useState(0);
    const handleBookTypeParam = (e) => {
        setBookTypeParam(e);
    };
    const handleBookStatusParam = (e) => {
        setBookStatusParam(e.target.value);
    };
    const handleBookSearchParam = (e) => {
        setSearchParam(e.target.value);
    };
    const handlePaging = (page, pageSize) => {
        console.log(page, pageSize);
        setSearchPageNumber(page - 1);
        setSearchPageSize(pageSize);

        let param = {
            search: searchParam,
            bookSearchType: bookTypeParam,
            bookStatus: bookStatusParam,
            size: searchPageSize,
            page: page - 1,
            startAt: startDt,
            endAt: endDt,
        };

        dispatch({type: SEARCH_SAVED_BOOK_REQUEST, payload: param});
    };
    const handlePickDate = (date, dateString) => {
        console.log("d ", dateString);

        let s = dateString[0].substring(0, 10);
        let e = dateString[1].substring(0, 10);
        setStartDt(s + " 00:00:00");
        setEndDt(e + " 00:00:00");
    };

    const handleSearchSaveBook = () => {
        setSearchPageNumber(0);
        setSearchPageSize(searchPageSize);
        let param = {
            search: searchParam,
            bookSearchType: bookTypeParam,
            bookStatus: bookStatusParam,
            size: saveBookResult != null ? saveBookResult.pageable.pageSize : 6,
            page: searchPageNumber,
            startAt: startDt,
            endAt: endDt,
        };

        dispatch({type: SEARCH_SAVED_BOOK_REQUEST, payload: param});
    };
    return (
        <div style={{width: "100%", margin: "auto"}}>
            <Row style={{marginTop: "22px"}}>
                <Col span={4}></Col>
                <Col span={8}>
                    <Search
                        enterButton
                        placeholder="입고 한 책을 검색"
                        onChange={handleBookSearchParam}
                        onSearch={handleSearchSaveBook}
                        loading={isLoading}
                    />
                </Col>
                <Col span={1}></Col>
                <Col span={8}>
                    <Select
                        defaultValue="책 이름"
                        style={{width: 130}}
                        onChange={handleBookTypeParam}
                    >
                        <OptGroup label="검색 유형">
                            <Option value="TITLE">책 이름</Option>
                            <Option value="AUTHOR">책 저자</Option>
                            <Option value="PUBLISHER">출판사</Option>
                            <Option value="ISBN">ISBN</Option>
                        </OptGroup>
                    </Select>
                </Col>
            </Row>
            <Row style={{marginTop: "22px"}}>
                <Col span={3}></Col>
                <Col span={6}>
                    <Tag color="geekblue">입고 상태</Tag>
                    <Radio.Group
                        defaultValue="ALL"
                        buttonStyle="solid"
                        onChange={handleBookStatusParam}
                    >
                        <Radio.Button value="ALL">전체</Radio.Button>
                        <Radio.Button value="WAIT">입고 대기중</Radio.Button>
                        <Radio.Button value="COMP">입고 완료</Radio.Button>
                        <Radio.Button value="RENT">대여 중</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={6}>
                    <Tag color="geekblue">입고 날짜 검색</Tag>
                    <Space>
                        <RangePicker
                            defaultValue={new Date()}
                            onCalendarChange={handlePickDate}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <SavedBookResult/>
            </Row>

            <Row style={{margin: "auto"}}>
                {saveBookResult != null ? (
                    <Pagination
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "40px",
                        }}
                        current={searchPageNumber + 1}
                        pageSize={searchPageSize}
                        total={saveBookResult.totalElements}
                        onChange={handlePaging}
                    />
                ) : null}
            </Row>
        </div>
    );
}

export default SavedBook;
