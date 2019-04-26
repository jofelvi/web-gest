import React from 'react';
import { Menu, Layout } from 'antd';

import { LogoContainer, Logo } from './styles';

import logo from '../../assets/logo.png';

const { Header: AntdHeader } = Layout;
const { Item } = Menu;

const Header = () => (
  <AntdHeader className="header">
    <LogoContainer className="logo">
      <Logo src={logo} shape="square" />
    </LogoContainer>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
    >
      <Item key="1">nav 1</Item>
      <Item key="2">nav 2</Item>
      <Item key="3">nav 3</Item>
    </Menu>
  </AntdHeader>
);

export default Header;
