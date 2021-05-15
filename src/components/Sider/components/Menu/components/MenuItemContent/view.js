import React from "react";
import PropTypes from "prop-types";
import { Icon } from '@ant-design/compatible';

import { SideLink } from "../../styles";

const ItemContent = ({ icon, link, name }) => (
  <>
    <Icon type={icon} />
    <span>
      <SideLink to={link}>{name}</SideLink>
    </span>
  </>
);

ItemContent.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ItemContent;
