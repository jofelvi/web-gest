import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetSuccesAC } from "../../../../modules/acuerdosComer/actions";

const PlanesCompraSaved = (props) => {
  const { plan, ac, mensaje } = props;
  let history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetSuccesAC());
    ac ? history.push(props.redirectURL) : history.push("/planes-de-compra/");
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
