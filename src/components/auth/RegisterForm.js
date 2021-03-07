import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "./AuthForm";
import { withRouter } from "react-router-dom";
const RegisterForm = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "register", key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, nickname, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      alert("비밀번호를 확인해주세요.")
      return;
    }

    dispatch(register({ email, nickname, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);
  useEffect(() => {
    if (authError) {
      console.log(authError);
      return;
    }

    if (auth) {
      alert("회원가입 성공!");
      console.log(auth);
      window.location.replace("/");
    }
  }, [auth, authError]);
  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(RegisterForm);
