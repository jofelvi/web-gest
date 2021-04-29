import React, { Component } from 'react';
import PlanesCompraFiltersNew from "./FilterPlanesNew";
import AcuerdosComercialesTable from "./AcuerdosComercialesTable";
import '../../styles.css'
import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {Maincontainer} from "../../lib/styled";
import {useHistory} from "react-router-dom";

const CommercialDealNew = (props) => {
    const history = useHistory()
    return (
        <div className="table-indas table-indas-new">
            <h2 className="table-indas-title">Acuerdos Comerciales</h2>

                <Button type="link" onClick={() => { history.push('/acuerdos-comerciales') }}>
                    <LeftOutlined /> Atrás
                </Button>
            <PlanesCompraFiltersNew />
            <AcuerdosComercialesTable />
        </div>
    );

}


export default CommercialDealNew;
