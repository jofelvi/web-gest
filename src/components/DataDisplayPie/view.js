import React from "react";

import { ContainerData, TextBadge, DataNumber } from './styles';
import { Icon } from "antd";



  const DataDisplayPie = ({numberElement, textElement, iconType, styleColor}) => { 
        
          
        return(
          <ContainerData>
  <TextBadge><Icon type={iconType} theme="filled" style={styleColor}/>{textElement}</TextBadge>
          <DataNumber>{numberElement + '%'}</DataNumber>
        </ContainerData>
        
        )
    }
    DataDisplayPie.propTypes = {
 
    };
    export default DataDisplayPie;