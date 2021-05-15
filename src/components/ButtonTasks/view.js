import React from "react";

import {ButtonTask, ButtonText} from './styles'
import { Icon } from '@ant-design/compatible';

import {Badge} from 'antd';
import { taskBadgeColor, taskBadgeNumberColor, taskIconSize, taskIconColor, taskBadgeShadow } from './constants'

  const ButtonTasks = ({ buttonText, iconType, counter}) => {

        return(
          <Badge count={counter} style={{ backgroundColor: taskBadgeColor , color: taskBadgeNumberColor , boxShadow: taskBadgeShadow }}
          >
          <ButtonTask>
      <Icon type={iconType} style={{ fontSize: taskIconSize, color: taskIconColor }}/>
        <ButtonText>{buttonText}</ButtonText>
        </ButtonTask>
        </Badge>

        )
    }
    ButtonTasks.propTypes = {

    };
    export default ButtonTasks;
