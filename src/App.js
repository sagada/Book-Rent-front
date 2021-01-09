import React from "react";

import { Route, withRouter, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";
import AdminPage from "./pages/AdminPage";
import BookPage from "./pages/BookPage";
import OrderPage from "./pages/OrderPage";
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout;
function App({ history }) {
  const locations = useLocation();
  return (
    <>
      <Layout style={{ height: "2000px" }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[locations.pathname]}
          >
            <Menu.Item key="/" onClick={() => history.push("/")}>
              입고하기
            </Menu.Item>
            <Menu.Item key="/admin" onClick={() => history.push("/admin")}>
              책 검색
            </Menu.Item>

            <Menu.Item key="/order" onClick={() => history.push("/order")}>
              입고 주문 검색
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <Route component={BookPage} exact={true} path="/" />
          <Route component={AdminPage} exact={true} path="/admin" />
          <Route component={OrderPage} exact={true} path="/order" />
        </Content>

        <Footer></Footer>
      </Layout>
    </>
  );
}
export default withRouter(App);
