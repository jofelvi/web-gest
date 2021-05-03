import React, { Component } from 'react';
// import PlanesCompraFiltersNew from "./FilterPlanesNew";
import AcuerdosComercialesTable from "./AcuerdosComercialesTable";
import '../../styles.css'
import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {Maincontainer} from "../../lib/styled";
import {useHistory} from "react-router-dom";

const CommercialDealNew = (props) => {

    return (
        <div className="table-indas table-indas-new">
            <AcuerdosComercialesTable />
        </div>
    );

}


export default CommercialDealNew;
