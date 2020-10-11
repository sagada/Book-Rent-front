import React, { useState, useEffect } from "react";

import { Route, Link, withRouter } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import BookPage from "./pages/BookPage";
import "antd/dist/antd.css";

const { Header, Footer, Sider, Content } = Layout;
function App({ history }) {
  return (
    <>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={() => history.push("/book")}>
              책 검색
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push("/reserve")}>
              책 예약
            </Menu.Item>
            <Menu.Item key="3" onClick={() => history.push("/admin")}>
              어드민
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <Route component={HomePage} exact={true} path="/" />
          <Route component={AdminPage} path="/admin" />
          <Route component={BookPage} path="/book" />
        </Content>

        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}
export default withRouter(App);
