import React, {Component} from 'react';

import BrandsSubList from "../../../components/BrandsSubList";
import {Button} from "antd";
import {
    LeftOutlined
} from '@ant-design/icons';
import {useHistory} from "react-router-dom";

const CreateCommercialDealNew = (props) => {
    const history = useHistory()
    return (
        <div  >
            <Button  type="link" onClick={() => { history.push('/acuerdos-comerciales') }}>
                <LeftOutlined /> Atrás
            </Button>
            <h2 className="table-indas-title">Crear Acuerdo Comercial</h2>

            <BrandsSubList
                {...props}
            />

        </div>
    );

}


export default CreateCommercialDealNew;
