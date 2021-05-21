import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const PlanesCompraSaved = (props) => {
  const { plan, ac, mensaje } = props;
  let history = useHistory();

  const handleClick = () => {
    ac ? history.push("/acuerdos-comerciales") : history.push("/planes-de-compra/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <CheckOutlined style={{ fontSize: "42px" }} />
      </div>
      <h3 style={{ margin: "15px" }}>{ac ? mensaje : props.message(plan)}</h3>
      <Button type="primary" onClick={() => handleClick()}>
        Volver al listado
      </Button>
    </div>
  );
};

export default PlanesCompraSaved;
