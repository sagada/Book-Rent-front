import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { check } from "../../modules/user";
import { initializeForm, changeField, login } from "../../modules/auth";
import AuthForm from "./AuthForm";

const LoginForm = ({history}) => {
  const dispatch = useDispatch();

  const { form ,auth, authError, user} = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth : auth.auth,
    authError : auth.authError,
    user : user.user
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {email, password} = form;
    dispatch(login({ email, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때에 form 을 초기화 함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(()=>{
    if (authError)
    {
      console.log('오류 발생')
      console.log(authError)
      return ;
    }

    if (auth)
    {
      dispatch(check())

      console.log(
        'auth 출력', auth
      )
      // window.localStorage.setItem('token', auth.token)
    }

  }, [auth, authError, dispatch])

  
  useEffect(()=>{
    if (user){
      window.location.replace('/')
    }
  },[user, history])
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(LoginForm);
