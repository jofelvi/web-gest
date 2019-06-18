import React from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import { Menu, Layout, Row, Col, Button } from "antd";

import {
  LogoContainer,
  Logo,
  RightSectionContainer,
  SignupButton
} from "./styles";
import MenuItem from "./components/MenuItem";

import { STATUS } from "../../modules/auth/constants";

import logo from "../../assets/logo.png";

const { Header: AntdHeader } = Layout;

const renderLoginButton = (pathname, history) =>
  pathname === "/login" ? null : (
    <>
      <Button onClick={() => history.push("/login")} type="primary">
        Login
      </Button>
      <SignupButton onClick={() => history.push("/signup")} type="primary">
        Sign up
      </SignupButton>
    </>
  );

const Header = ({ logout, status, history, location: { pathname } }) => (
  <AntdHeader className="header">
    <LogoContainer className="logo">
      <Logo src={logo} shape="square" />
    </LogoContainer>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ lineHeight: "64px" }}
    >
      <Row type="flex">
        <Col span={1}>
          <MenuItem key="1">Nav 1</MenuItem>
        </Col>
        <Col span={1}>
          <MenuItem key="2">Nav 2</MenuItem>
        </Col>
        <Col span={1}>
          <MenuItem key="3">Nav 3</MenuItem>
        </Col>
        <Col span={15} />
        <RightSectionContainer span={6}>
          {status === STATUS.LOGGED ? (
            <Col span={2}>
              <Button
                onClick={() => {
                  logout();
                  history.push("/login");
                }}
                type="primary"
              >
                Logout
              </Button>
            </Col>
          ) : (
            renderLoginButton(pathname, history)
          )}
        </RightSectionContainer>
      </Row>
    </Menu>
  </AntdHeader>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default withRouter(Header);
