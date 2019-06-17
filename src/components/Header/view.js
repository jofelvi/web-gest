import React from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import { Menu, Layout, Row, Col, Button } from "antd";

import { LogoContainer, Logo, RightSectionContainer } from "./styles";
import MenuItem from "./components/MenuItem";

import { STATUS } from "../../modules/auth/constants";

import logo from "../../assets/logo.png";

const { Header: AntdHeader } = Layout;

const Header = ({ logout, status, history }) => (
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
          <MenuItem key="1">nav 1</MenuItem>
        </Col>
        <Col span={1}>
          <MenuItem key="2">nav 2</MenuItem>
        </Col>
        <Col span={1}>
          <MenuItem key="3">nav 3</MenuItem>
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
            <Button onClick={() => history.push("/login")} type="primary">
              Login
            </Button>
          )}
        </RightSectionContainer>
      </Row>
    </Menu>
  </AntdHeader>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default withRouter(Header);
