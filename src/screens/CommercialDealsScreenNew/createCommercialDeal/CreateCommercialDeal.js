import React, {Component} from 'react';

import BrandsSubList from "../../../components/BrandsSubList";
import {Button} from "../../../components/GroupButtons/styles";
import {
    LeftOutlined
} from '@ant-design/icons';

const CreateCommercialDealNew = (props) => {

    return (
        <div>
            <h2 className="table-indas-title">Crear Acuerdo Comercial’</h2>

            <BrandsSubList
                {...props}
            />

        </div>
    );

}


export default CreateCommercialDealNew;
