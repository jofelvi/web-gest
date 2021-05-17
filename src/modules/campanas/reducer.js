import {
  GET_SUBMARCAS,
  GET_CATALOGO,
  ITEMS_MARCADOS,
  PRODUCTOS_FILTRADOS,
  ELIMINAR_DUPLICADOS,
  ELIMINAR_ITEMS_MARCADOS,
  GET_CAMPANAS,
  GET_INDIVIDUAL_CAMPANA,
  CREATE_CAMPANA,
  EDIT_CAMPANA,
  COPY_CAMPANA,
  FILTER_ACTIVE,
  CREATE_CAMPANA_SUCCESS,
  CREATE_CAMPANA_FAILED,
  GET_FILTER_DATA,
  LIMPIAR_BTN,
  GET_MARCAS,
  GET_FAMILIA,
} from "./constants";

export const INITIAL_STATE = {
  arrayCampanas: [],
  subMarcaArray: [],
  productoArray: [],
  arrayFilter: [],
  productsfilted: [],
  marcadosArray: [],
  listAcuerdosCom: [],
  createCampanaRespon: [],
  editCampanaRespon: [],
  copyCampana: [],
  individualCampana: {},
  createCampanaSuccess: false,
  filterActive: false,
  filterDataTableAC: [],
  limpiarBtn: false,
  marcasArray: [],
  familiaArray: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAMPANAS:
      return { ...state, arrayCampanas: action.payload };
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
    case CREATE_CAMPANA:
      return { ...state, createCampanaRespon: action.payload };
    case EDIT_CAMPANA:
      return { ...state, editCampanaRespon: action.payload };
    case COPY_CAMPANA:
      return { ...state, copyCampana: action.payload };
    case GET_INDIVIDUAL_CAMPANA:
      return { ...state, individualCampana: action.payload };
    case CREATE_CAMPANA_SUCCESS:
      return { ...state, createCampanaSuccess: action.payload };
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
    default:
      return state;
  }
};
