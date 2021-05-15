import React from "react";
import PropTypes from "prop-types";

import { Icon } from '@ant-design/compatible';

import { SideLink } from "../../styles";

const SubMenuItemContent = ({ icon, link, name, isLink }) => (
  <span>
    <Icon type={icon} />
    {isLink ? <SideLink to={link}>{name}</SideLink> : <span>{name}</span>}
  </span>
);

SubMenuItemContent.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  isLink: PropTypes.bool
};

SubMenuItemContent.defaultProps = {
  isLink: true
};

export default SubMenuItemContent;
