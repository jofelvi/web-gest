import React, { Component, useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FormCreateAcuerdosComerciales from "./FormCreateAcuerdosComerciales";
import {useDispatch, useSelector} from "react-redux";
import { resetSuccesAC } from "../../../modules/acuerdosComer/actions";
import FormCreateAc from "./FormCreateAc";
import { Formik } from "formik";
import moment from "moment";


const initialValues = {
    selectOptions: ["Borrador", "Activo", "Inactivo"],
};

export const dateFormat = "DD-MM-YYYY";

const CreateCommercialDealNew = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bodyRedux = useSelector((state) => state.acuerdosComer.body);

  const handleSubmit = (formProps) => {
      const { bookingClient, bookingDate, bookingTime, email } = formProps;
      const selectedDate = moment(bookingDate).format(dateFormat);
      let bodyForm = formProps
      let bodyReduxVar = bodyRedux
      let objResult = delete bodyForm.selectOptions
      bodyReduxVar.nombre = bodyForm.nombre
      bodyReduxVar.descripcion = bodyForm.descripcion
      bodyReduxVar.idestado = handleSelect(bodyForm.idestado)
      bodyReduxVar.fechainicio = handleDates(bodyForm.fechainicio)
      bodyReduxVar.fechafin = handleDates(bodyForm.fechafin)

          console.log(bodyReduxVar)

      alert(
          `${JSON.stringify(bodyReduxVar)}`
      );
  };

  const handleSelect= (item)=>{

      switch (item){
          case "Borrador":
              return 0
          case "Activo":
              return 1
          case "Inactivo":
              return 2
      }
  }

  const handleDates=(date)=>{
      let d = new Date(date)
      let dateIso = d.toISOString()
     return dateIso
  }
  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          dispatch(resetSuccesAC());
          history.push("/acuerdos-comerciales");
        }}
      >
        <LeftOutlined /> Atrás
      </Button>

      <h2 className="table-indas-title">Crear Acuerdo Comercial</h2>

     <FormCreateAcuerdosComerciales {...props} />
       {/* <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={FormCreateAc}
        />*/}
    </div>
  );
};

export default CreateCommercialDealNew;
