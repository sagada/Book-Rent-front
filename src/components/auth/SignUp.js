import { Form, Input, Select, Tooltip, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, initializeForm } from "../../modules/auth";
const SignUp = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));
  const { Option } = Select;
  const onChange = (e) => {};
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      // TODO 오류처리
      return;
    }

    dispatch(register({ username, password }));
  };
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 회원 가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
    }
  }, [auth, authError]);
  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Username">
        <Form.Item
          name="username"
          noStyle
          rules={[{ required: true, message: "Email 을 입력해주세요." }]}
        >
          <Input style={{ width: 160 }} placeholder="email" />
        </Form.Item>
        <Tooltip title="Useful information">
          <a href="#API" style={{ margin: "0 8px" }}>
            Need Help?
          </a>
        </Tooltip>
      </Form.Item>
      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={["address", "province"]}
            noStyle
            rules={[{ required: true, message: "Province is required" }]}
          >
            <Select placeholder="Select province">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["address", "street"]}
            noStyle
            rules={[{ required: true, message: "Street is required" }]}
          >
            <Input style={{ width: "50%" }} placeholder="Input street" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
        <Form.Item
          name="year"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="Input birth year" />
        </Form.Item>
        <Form.Item
          name="month"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Input birth month" />
        </Form.Item>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
