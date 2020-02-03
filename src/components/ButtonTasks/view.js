import React from "react";

import {ButtonTask, ButtonText} from './styles'

import {Icon, Badge} from 'antd';

  const ButtonTasks = ({ buttonText, iconType, counter}) => {
       
        return(
          <Badge count={counter} style={{ backgroundColor: 'orange', color: '#fffff', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
          >
          <ButtonTask>
      <Icon type={iconType} style={{ fontSize: '40px', color: '#08c' }}/>
        <ButtonText>{buttonText}</ButtonText>
        </ButtonTask>
        </Badge>
        
        )
    }
    ButtonTasks.propTypes = {
 
    };
    export default ButtonTasks;