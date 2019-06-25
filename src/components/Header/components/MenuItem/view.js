import React from "react";
import PropTypes from "prop-types";

import { Menu } from "antd";

const MenuItem = props => (
  <Menu.Item onItemHover={() => props.onItemHover} {...props}>
    {props.children}
  </Menu.Item>
);

MenuItem.propTypes = {
  onItemHover: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default MenuItem;
