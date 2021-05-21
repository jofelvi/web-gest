import React, { Component, useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormEdi2AcuerdosComerciales from "./FormEdit2AcuerdosComerciales";
import { resetSuccesAC } from "../../../modules/acuerdosComer/actions";

const CreateCommercialDealNew = (props) => {
  const history = useHistory();
  const successCreate = useSelector((state) => state.acuerdosComer.createAcuerdoSucces);
  const dispatch = useDispatch();
  useEffect(() => {}, [successCreate]);

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

      <h2 className="table-indas-title">Editar Acuerdo Comercial</h2>

      <div className="table-indas table-indas-new">
        <FormEdi2AcuerdosComerciales />
      </div>
    </div>
  );
};

export default CreateCommercialDealNew;
