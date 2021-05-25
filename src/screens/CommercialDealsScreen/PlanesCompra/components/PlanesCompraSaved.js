import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import {resetSuccesAC} from "../../../../modules/acuerdosComer/actions";
import { useDispatch, useSelector } from "react-redux";

const PlanesCompraSaved = (props) => {
  const { plan, ac, mensaje } = props;
  let history = useHistory();
  let dispatch = useDispatch()
  const handleClick = () => {
    ac ? history.push("/acuerdos-comerciales") : history.push("/planes-de-compra/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <CheckOutlined style={{ fontSize: "42px" }} />
      </div>
      <h3 style={{ margin: "15px" }}>{ac ? mensaje : props.message(plan)}</h3>
      <Button type="primary" onClick={() => {
          dispatch(resetSuccesAC());
          handleClick()
      }}>
        Volver al listado
      </Button>
    </div>
  );
};

export default PlanesCompraSaved;
