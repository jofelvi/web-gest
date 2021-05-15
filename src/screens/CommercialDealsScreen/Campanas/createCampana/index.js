import React, { Component, useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FormCreateCampana from "./form";

const CreateCampana = (props) => {
  const history = useHistory();

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

      <h2 className="table-indas-title">Crear Campaña</h2>

      <FormCreateCampana {...props} />
    </div>
  );
};

export default CreateCampana;
