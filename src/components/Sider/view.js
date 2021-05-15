import React from 'react';

import { Layout } from 'antd';

import Menu from './components/Menu';

const { Sider: AntdSider } = Layout;

const Sider = () => (
  <AntdSider width={235} style={{ background: '#fff' }}>
    <Menu />
  </AntdSider>
);

export default Sider;
