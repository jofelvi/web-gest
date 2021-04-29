import React, {useState,useEffect} from 'react';
import {Button, Result} from "antd";


const ResultSuccesComponent =()=> {

        return (
         <div>
             <Result
                 status="success"
                 title="Guardado exitoso"
                 subTitle="Se creo exitosamente su acuerdo comercial"
                 extra={[
                     <Button type="primary" key="console">
                       Aceptar
                     </Button>

                 ]}
             />,
         </div>
        );

}


export default ResultSuccesComponent;
