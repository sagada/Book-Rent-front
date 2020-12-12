import React from "react";

import { Route, Link, withRouter } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import BookPage from "./pages/BookPage";
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout;
function App({ history }) {
  return (
    <>
      <Layout style={{ height: "2000px" }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={() => history.push("/book")}>
              입고하기
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push("/reserve")}>
              입고관리
            </Menu.Item>
            <Menu.Item key="3" onClick={() => history.push("/admin")}>
              책 현황보기
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <Route component={HomePage} exact={true} path="/" />
          <Route component={AdminPage} path="/admin" />
          <Route component={BookPage} path="/book" />
        </Content>

        <Footer></Footer>
      </Layout>
    </>
  );
}
export default withRouter(App);
