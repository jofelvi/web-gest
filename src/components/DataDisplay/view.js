import React from "react";

import { ContainerData, TextBadge, DataNumber } from './styles';
import { Icon } from '@ant-design/compatible';



  const DataDisplay = ({numberElement, textElement, iconType, styleColor, dataDisplayClients}) => {


        return(
          <ContainerData clientsData = {dataDisplayClients}>
  <TextBadge><Icon type={iconType} theme="filled" style={styleColor}/>{textElement}</TextBadge>
          <DataNumber>{numberElement}</DataNumber>
        </ContainerData>

        )
    }
    DataDisplay.propTypes = {

    };
    export default DataDisplay;
