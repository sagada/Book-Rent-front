import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Select, Tooltip, Button } from "antd";
const textMap = {
  login: "로그인",
  register: "회원가입",
};
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;
const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <>
      <h3
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
          color: "red",
          fontSize: "30px",
        }}
      >
        {text}
      </h3>

      {type == "register" && (
        <Form style={{ width: "80%", margin: "auto" }} onChange={onChange}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
          >
            <Input value={form.email} name="email" />
          </Form.Item>
          <Form.Item
            label="Nickname"
            name="nickname"
            rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
          >
            <Input value={form.nickname} name="nickname" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
          >
            <Input.Password value={form.password} name="password" />
          </Form.Item>

          <Form.Item
            label="PasswordConfirm"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "비밀번호를 다시 한번 입력 해주세요!",
              },
            ]}
          >
            <Input.Password
              value={form.passwordConfirm}
              name="passwordConfirm"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      )}

      {type == "login" && (
        <Form onChange={onChange} style={{ width: "80%", margin: "auto" }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input value={form.email} name="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input.Password name="password" value={form.password} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default AuthForm;
