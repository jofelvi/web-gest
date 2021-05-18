import React, { Component, useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FormEditCampana from "./form";

const EditCampana = (props) => {
  const history = useHistory();
  const successCreate = useSelector((state) => state.acuerdosComer.createAcuerdoSucces);

  useEffect(() => {}, [successCreate]);

  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          history.push("/campañas");
        }}
      >
        <LeftOutlined /> Atrás
      </Button>

      <h2 className="table-indas-title">Editar Campaña</h2>

      <div className="table-indas table-indas-new">
        <FormEditCampana />
      </div>
    </div>
  );
};

export default EditCampana;
