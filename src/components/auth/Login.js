import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import { changeValue, LOGIN_REQUEST } from "../../modules/auth";
const Login = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({ form: auth.login }));

  const onChangeEmail = (e) => {
    const { value, name } = e.target;
    dispatch(changeValue({ form: "login", key: "username", value }));
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    dispatch(changeValue({ form: "login", key: "password", value }));
  };

  const onSubmit = (e) => {
    console.log("!@#!#");
    dispatch({ type: LOGIN_REQUEST, payload: form });
  };

  const onFinish = () => {
    console.log(form);
    dispatch({ type: LOGIN_REQUEST, payload: form });
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 5,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 4,
    },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        style={{ width: "80%", margin: "auto" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onSubmit={onSubmit}
      >
        <Form.Item
          label="email"
          onChange={onChangeEmail}
          name="email"
          rules={[
            {
              required: true,
              message: "이메일을 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          onChange={onChangePassword}
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
