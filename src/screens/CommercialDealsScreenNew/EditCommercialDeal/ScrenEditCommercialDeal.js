import React, {Component, useEffect, useState} from 'react';
import {Button, Spin} from "antd";
import {
    LeftOutlined
} from '@ant-design/icons';
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import FormEdi2AcuerdosComerciales from "./FormEdit2AcuerdosComerciales";

const CreateCommercialDealNew = (props) => {
    const history = useHistory()
    const successCreate = useSelector((state) => state.acuerdosComer.createAcuerdoSucces)

    useEffect(() => {

    }, [successCreate])

    return (
        <div  >
            <Button  type="link" onClick={() => { history.push('/acuerdos-comerciales') }}>
                <LeftOutlined /> Atrás
            </Button>

            <h2 className="table-indas-title">Editar Acuerdo Comercial</h2>

            <div className="table-indas table-indas-new">
               <FormEdi2AcuerdosComerciales/>
            </div>

        </div>
    );

}


export default CreateCommercialDealNew;
