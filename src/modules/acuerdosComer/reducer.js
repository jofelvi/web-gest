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
  GET_FAMILIA, FORM_BODY,
} from "./constans";

export const INITIAL_STATE = {
  arrayAcuerdos: [],
  subMarcaArray: [],
  productoArray: [],
  arrayFilter: [],
  productsfilted: [],
  marcadosArray: [],
  listAcuerdosCom: [],
  createAcuerdoRespon: [],
  editAcuerdoRespon: [],
  copyAcuerdo: [],
  listaDelegados: [],
  cod_Cliente: [
    {
      idcliente: "",
      codcli_cbim: "",
    },
  ],
  acuerdoAc: {
    clientes: [],
  },
  createAcuerdoSucces: false,
  filterActive: false,
  filterDataTableAC: [],
  limpiarBtn: false,
  marcasArray: [],
  familiaArray: [],
  body:{
    productos: [],
    clientes: [],
    escalados: [],
    submarcas: [],
    margen: parseFloat(1.0),
    idestado: 1,
    idtipo: 1,
    ind_renovar: false,
    ind_seleccion_conjunta: true,
    ind_surtido: false,
    fechainicio: new Date().toISOString(),
    fechafin: new Date().toISOString(),
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACUERDOS:
      return { ...state, arrayAcuerdos: action.payload };
    case GET_SUBMARCAS:
      return { ...state, subMarcaArray: action.payload };
    case GET_CATALOGO:
      return { ...state, productoArray: action.payload };
    case ITEMS_MARCADOS:
      if (action.payload.length === 0) {
        return { ...state, marcadosArray: [] };
      } else {
        return { ...state, marcadosArray: state.marcadosArray.concat(action.payload) };
      }
    case ELIMINAR_ITEMS_MARCADOS:
      return { ...state, marcadosArray: action.payload };
    case ELIMINAR_DUPLICADOS:
      return { ...state, productsfilted: action.payload };
    case GET_ACUERDOS_COMERCIALES:
      return { ...state, listAcuerdosCom: action.payload };
    case CREATE_ACUERDOS_COMERCIALES:
      return { ...state, createAcuerdoRespon: action.payload };
    case EDIT_ACUERDOS_COMERCIALES:
      return { ...state, editAcuerdoRespon: action.payload };
    case COPY_ACUERDOS_COMERCIALES:
      return { ...state, copyAcuerdo: action.payload };
    case GET_DELEGADOS:
      return { ...state, listaDelegados: action.payload };
    case COD_CLIENT:
      return { ...state, cod_Cliente: action.payload };
    case ACUERDO_AC:
      return { ...state, acuerdoAc: action.payload };
    case CREATE_ACUERDOS_COMERCIALES_SUCCESS:
      return { ...state, createAcuerdoSucces: action.payload };
    case PRODUCTOS_FILTRADOS:
      return { ...state, productsfilted: action.payload };
    case FILTER_ACTIVE:
      return { ...state, filterActive: action.payload };
    case GET_FILTER_DATA:
      return { ...state, filterDataTableAC: action.payload };
    case LIMPIAR_BTN:
      return { ...state, limpiarBtn: action.payload };
    case GET_MARCAS:
      return { ...state, marcasArray: action.payload };
    case GET_FAMILIA:
      return { ...state, familiaArray: action.payload };
    case FORM_BODY:
      return { ...state, body: {...state.body, ...action.payload}  };
    default:
      return state;
  }
};
