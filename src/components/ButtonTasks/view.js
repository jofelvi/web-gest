import React from "react";

import {ButtonTask, ButtonText} from './styles'

import {Icon} from 'antd';

  const ButtonTasks = ({ buttonText, iconType}) => {
       
        return(
          <ButtonTask>
      <Icon type={iconType} style={{ fontSize: '40px', color: '#08c' }}/>
        <ButtonText>{buttonText}</ButtonText>
        </ButtonTask>
        
        )
    }
    ButtonTasks.propTypes = {
 
    };
    export default ButtonTasks;