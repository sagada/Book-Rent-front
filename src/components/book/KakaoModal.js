import {Modal, Table, Tag, Alert} from "antd";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeModalState,
    SAVE_KAKAO_REQUEST,
    deleteSaveBookParamByIdx,
    setSaveBookList,
} from "../../modules/book";
import {InputNumber, Image} from "antd";

function KakaoModal() {
    const dispatch = useDispatch();
    const {isBookModalOpen, saveBookListParam, saveBookIsSuccess} = useSelector(
        (state) => state.book
    );
    const handleModalState = () => {
        dispatch(changeModalState(!isBookModalOpen));
    };

    const handleDeleteSaveBookItemk = (idx) => {
        let newModalList = [];
        console.log(idx);
        for (let i = 0; i < saveBookListParam.length; i++) {
            if (idx.key !== saveBookListParam[i].key) {
                console.log("!");
                newModalList.push(saveBookListParam[i]);
            }
        }

        dispatch(setSaveBookList(newModalList));
    };

    const handleChangeInputQuantity = (idx) => {
        console.log(idx.key);
        let curInput = document.getElementById(`inp${idx.key}`);
        let copy = saveBookListParam;
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].key == idx.key) {
                copy[i].quantity = parseInt(curInput.value) + 1;
            }
        }

        setSaveBookList(copy);
    };
    const columns = [
        {
            title: "이미지",
            key: "imgUrl",
            dataIndex: "imgUrl",
            render: (imgUrl) => (
                <>
                    <Image width={90} src={imgUrl}/>
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
            colSpan: 1,
        },
        {
            title: "가격",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "입고수량",
            key: "action",
            render: (idx) => (
                <InputNumber
                    id={`inp${idx.key}`}
                    size="large"
                    min={1}
                    max={20}
                    defaultValue={1}
                    onChange={() => handleChangeInputQuantity(idx)}
                />
            ),
        },
        {
            title: "",
            key: "cancel",
            render: (idx) => (
                <Tag onClick={() => handleDeleteSaveBookItemk(idx)} color="magenta">
                    취소
                </Tag>
            ),
        },
    ];

    const saveBooks = () => {
        let param = {
            setBookParamList: saveBookListParam,
        };

        dispatch({type: SAVE_KAKAO_REQUEST, payload: param});
    };

    useEffect(() => {
    }, [isBookModalOpen, saveBookListParam]);

    return (
        <Modal
            width={1500}
            title="입고 리스트"
            visible={isBookModalOpen}
            onOk={saveBooks}
            onCancel={handleModalState}
            okText={"입고"}
            cancelText={"취소"}
        >
            {saveBookIsSuccess ? (
                <Alert message="Success Text" type="success" closable/>
            ) : null}
            <Table
                size="small"
                columns={columns}
                dataSource={saveBookListParam}
                pagination={false}
            />
        </Modal>
    );
}

export default KakaoModal;
