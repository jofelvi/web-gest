import React from 'react';

import { Layout, Menu, Icon } from 'antd';

import { SideLink } from './styles';

const { SubMenu, Item } = Menu;
const { Sider: AntdSider } = Layout;

const Sider = () => (
  <AntdSider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Item key="1">
        <Icon type="desktop" />
        <span>
          <SideLink to="/">Home</SideLink>
        </span>
      </Item>
      <Item key="2">
        <Icon type="user" />
        <span>
          <SideLink to="/users">Users</SideLink>
        </span>
      </Item>
      <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="notification" />
            subnav 3
          </span>
        }
      >
        <Menu.Item key="9">option9</Menu.Item>
        <Menu.Item key="10">option10</Menu.Item>
        <Menu.Item key="11">option11</Menu.Item>
        <Menu.Item key="12">option12</Menu.Item>
      </SubMenu>
    </Menu>
  </AntdSider>
);

export default Sider;
