import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_KAKAO_REQUEST,
  changeQuery,
  changeTarget,
  changeSaveBookFlag,
} from "../../modules/book";
import {chagneFlagListIndex } from "../../modules/book";
import { Card,Input, Row, Col, Select, Button} from "antd";
import "antd/dist/antd.css";

function KakaoBookSearchRow ({rowIndex, colSize})
{
        const dispatch = useDispatch();
        const { Meta, Grid } = Card;
        const [len, setLen] = useState(0);
        const [cardLoading, setCardLoading] = useState(false);
        const {
            page,
            size,
            target,
            kakaoBookResult,
            saveBookFlag,
            saveBookList,
        } = useSelector((state) => state.book);

        const handleFlag = (e) => {
            console.log('index ',e,' 가 클릭되었습니다.')
            dispatch(chagneFlagListIndex(e));
        };
        
        const handleLoading = () => {
            setCardLoading(!cardLoading);
        };
    return (
         <Row justify="center" align="center" gutter={16}>
        {kakaoBookResult != null &&
          kakaoBookResult.documents.slice(rowIndex, colSize).map((book, idx) => {
            return (
              <Col span={4} key={idx}>
                <Card
                  onClick={() => handleFlag(rowIndex+ idx)}
                  key={idx + rowIndex}
                  size="small"
                  hoverable
                  style={{
                    width: "50%",
                    margin: "auto",
                    opacity: saveBookFlag === true ? "0.8" : "1",
                    border:
                      saveBookFlag && saveBookList[idx + rowIndex] === true
                        ? "3px solid rgb(33,139,255)"
                        : null,
                  }}
                  cover = {
                    <img
                      alt="example"
                      style={{ width: "95%", margin: "auto" }}
                      src={book.thumbnail}
                    />
                  }
                >
                  <Meta
                    key={idx}
                    title={book.title}
                    description={book.publisher}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
    )
}
export default KakaoBookSearchRow;