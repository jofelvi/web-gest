import React, { Component } from 'react';
import PlanesCompraFiltersNew from "./FilterPlanesNew";
import AcuerdosComercialesTable from "./AcuerdosComercialesTable";
import '../../styles.css'

const CommercialDealNew = (props) => {

    return (
        <div>
            <h2 className="table-indas-title">Acuerdos Comerciales</h2>
            <PlanesCompraFiltersNew />
            <AcuerdosComercialesTable />
        </div>
    );

}


export default CommercialDealNew;
