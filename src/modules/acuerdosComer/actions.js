import {
  GET_ACUERDOS,
  GET_SUBMARCAS,
  GET_CATALOGO,
  ITEMS_MARCADOS,
  PRODUCTOS_FILTRADOS,
  ELIMINAR_DUPLICADOS,
  ELIMINAR_ITEMS_MARCADOS,
  GET_ACUERDOS_COMERCIALES,
  COPY_ACUERDOS_COMERCIALES,
  EDIT_ACUERDOS_COMERCIALES,
  CREATE_ACUERDOS_COMERCIALES,
  GET_DELEGADOS,
  COD_CLIENT,
  ACUERDO_AC,
  CREATE_ACUERDOS_COMERCIALES_SUCCESS,
  FILTER_ACTIVE,
  GET_FILTER_DATA,
  LIMPIAR_BTN,
  GET_MARCAS,
  GET_FAMILIA,
} from "./constans";
import axios from "axios";
import utils from "../../lib/utils";

export const getAcuerdosComerciales = () => async (dispatch) => {
  let token = utils.getAuthToken();
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: GET_ACUERDOS_COMERCIALES,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const getMarcas = () => async (dispatch) => {
  let token = utils.getAuthToken();
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/marca`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: GET_MARCAS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const getFamilia = () => async (dispatch) => {
  let token = utils.getAuthToken();
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/familia`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: GET_FAMILIA,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const getSubmarcas = () => async (dispatch) => {
  let token = utils.getAuthToken();
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/submarca`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: GET_SUBMARCAS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const getCatalogoProductos = () => async (dispatch) => {
  let token = utils.getAuthToken();
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/producto`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: GET_CATALOGO,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const listItemMarcados = (array) => async (dispatch) => {
  console.log("listItemMarcados ", array);
  dispatch({
    type: ITEMS_MARCADOS,
    payload: array,
  });
};

export const productosFiltrados = (array) => async (dispatch) => {
  console.log("productosFiltrados ", array);

  dispatch({
    type: PRODUCTOS_FILTRADOS,
    payload: array,
  });
};

export const eliminarDuplicados = (array) => async (dispatch) => {
  console.log("eliminarDuplicados ", array);
  dispatch({
    type: ELIMINAR_DUPLICADOS,
    payload: array,
  });
};

export const eliminarItemsMarcados = (array) => async (dispatch) => {
  console.log("elementos a borrar", array);
  dispatch({
    type: ELIMINAR_ITEMS_MARCADOS,
    payload: array,
  });
};

export const createAcuerdosComerciales = (body) => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("BODY CREATE ", body);

  let response = await axios
    .post(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo/create`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("crear acuerdo done");
      dispatch({
        type: CREATE_ACUERDOS_COMERCIALES,
        payload: response.data,
      });
      let succes = () =>
        response.status === 201
          ? dispatch({
              type: CREATE_ACUERDOS_COMERCIALES_SUCCESS,
              payload: true,
            })
          : null;
      succes();
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const crearCampaña = (body) => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("BODY CREATE crearCampaña ", body);

  let response = await axios
    .post(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo/create`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("crear acuerdo done");
      dispatch({
        type: CREATE_ACUERDOS_COMERCIALES,
        payload: response.data,
      });
      let succes = () =>
        response.status === 201
          ? dispatch({
              type: CREATE_ACUERDOS_COMERCIALES_SUCCESS,
              payload: true,
            })
          : null;
      succes();
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const editAcuerdosComerciales = (body, id) => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("BODY edit ", body);

  let response = await axios
    .patch(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("editar  acuerdo done");
      dispatch({
        type: CREATE_ACUERDOS_COMERCIALES,
        payload: response.data,
      });
      console.log(response.status);
      dispatch({
        type: CREATE_ACUERDOS_COMERCIALES_SUCCESS,
        payload: true,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const getByIdAcuerdoComerciale = (id) => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("funcion llamar api getByIdAcuerdoComerciale", id);
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("getByIdAcuerdoComerciale acuerdo done");
      console.log(response.data);
      dispatch({
        type: ACUERDO_AC,
        payload: response.data,
      });
      return response.data;
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });

  return response;
};

export const getDelegado = () => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("funcion llamar api");
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/delegado`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log("getDelegado acuerdo done")
      // console.log("getDelegado " , response.data)
      dispatch({
        type: GET_DELEGADOS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const setCodCliente = (cod) => async (dispatch) => {
  let token = utils.getAuthToken();
  dispatch({
    type: COD_CLIENT,
    payload: cod,
  });
};

export const getFilterData = (parametros) => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("funcion llamar api");
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: parametros,
    })
    .then((response) => {
      // console.log("getDelegado acuerdo done")
      console.log("getFilterData ", response.data);
      dispatch({
        type: GET_FILTER_DATA,
        payload: response.data,
      });
      dispatch({
        type: FILTER_ACTIVE,
        payload: true,
      });
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};

export const disableFilterTable = () => async (dispatch) => {

  let cods = [{ idcliente: "", codcli_cbim: "" }];
  dispatch({
    type: FILTER_ACTIVE,
    payload: false,
  });
};

export const clearCods = () => async (dispatch) => {
  let token = utils.getAuthToken();
  let cods = [{ idcliente: "", codcli_cbim: "" }];

  dispatch({
    type: COD_CLIENT,
    payload: cods,
  });
};

export const resetSuccesAC = () => async (dispatch) => {
  dispatch({
    type: CREATE_ACUERDOS_COMERCIALES_SUCCESS,
    payload: false,
  });
};

export const handleBtnLimpiar = (value) => async (dispatch) => {
  dispatch({
    type: LIMPIAR_BTN,
    payload: value,
  });
};

export const getExcelAc = (parametros) => async (dispatch) => {
  let token = utils.getAuthToken();
  console.log("funcion llamar api");
  let response = await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}ntr/acuerdo?formato=excel`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log("getDelegado acuerdo done")
      console.log("getExcelAc ", response.data);
    })
    .catch((error) => {
      console.log("mensaje de error llamada API: ", error);
    });
};
