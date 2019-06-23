import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Empty } from 'antd';

const HomeScreen = ({ taskName }) =>
  taskName ? <Redirect to={`/task/${taskName}`} /> : <Empty />;

HomeScreen.propTypes = {
  taskName: PropTypes.string.isRequired
};

export default HomeScreen;
