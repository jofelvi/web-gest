import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Card } from 'antd';


import { Empty } from 'antd';
import {ChartContainer, StaticticsContainer} from './styled'
import LineChart from '../../components/LineChart/view.js';
import DonutChart from '../../components/DonutChart/view.js';

import utils from '../../lib/utils';

const HomeScreen = ({
  fetchTaskForm,
  process,
  procId,
  taskName,
  taskId,
  completed,
  history,
}) => {
  useEffect(() => {
    if (utils.getTaskId() || taskId) {
      const id = utils.getTaskId();
      fetchTaskForm({ taskId: id || taskId, history });
    }
  }, [taskId, fetchTaskForm]);

  const id = utils.getTaskId() ? utils.getTaskId() : taskId;

  if (id && procId && !completed) {
    return <Redirect to={`/task/${taskId}/process/${procId}`} />;
  }

  if (process && taskName) {
    return <Redirect to={`/process/${process}/${taskName}`} />;
  }
  return <StaticticsContainer>
    <ChartContainer><LineChart/></ChartContainer>
    <ChartContainer><DonutChart/></ChartContainer>
    <ChartContainer><DonutChart/></ChartContainer>
    </StaticticsContainer> 
  
  // return <PieChart />;
};

HomeScreen.propTypes = {
  process: PropTypes.string.isRequired,
  procId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default HomeScreen;
