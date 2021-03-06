import React from "react";

import { Route, withRouter, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";
import AdminPage from "./pages/AdminPage";
import BookPage from "./pages/BookPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout;

function App({ history }) {
  const location = useLocation();
  return (
    <>
      <Layout style={{ height: "2000px" }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/" onClick={() => history.push("/")}>
              입고하기
            </Menu.Item>
            <Menu.Item key="/admin" onClick={() => history.push("/admin")}>
              책 검색
            </Menu.Item>

            <Menu.Item key="/order" onClick={() => history.push("/order")}>
              주문 검색
            </Menu.Item>

            <Menu.Item key="/login" onClick={() => history.push("/login")}>
              로그인
            </Menu.Item>

            <Menu.Item key="/signup" onClick={() => history.push("/signup")}>
              회원가입
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <Route component={BookPage} exact={true} path="/" />
          <Route component={AdminPage} exact={true} path="/admin" />
          <Route component={OrderPage} exact={true} path="/order" />
          <Route component={LoginPage} exact={true} path="/login" />
          <Route component={SignUpPage} exact={true} path="/signup" />
        </Content>

        <Footer></Footer>
      </Layout>
    </>
  );
}

export default withRouter(App);
