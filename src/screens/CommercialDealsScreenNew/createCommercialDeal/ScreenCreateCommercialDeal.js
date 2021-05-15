import React, {Component, useEffect} from 'react';
import {Button} from "antd";
import {
    LeftOutlined
} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import FormCreateAcuerdosComerciales from "./FormCreateAcuerdosComerciales";


const CreateCommercialDealNew = (props) => {
    const history = useHistory()

    return (
        <div  >
            <Button  type="link" onClick={() => { history.push('/acuerdos-comerciales') }}>
                <LeftOutlined /> Atrás
            </Button>

            <h2 className="table-indas-title">Crear Acuerdo Comercial</h2>

            <FormCreateAcuerdosComerciales
                {...props}
            />

        </div>
    );

}


export default CreateCommercialDealNew;
