import {
    GET_ACUERDOS,
    GET_SUBMARCAS,
    GET_CATALOGO,
    ITEMS_MARCADOS,
    PRODUCTOS_FILTRADOS,
    ELIMINAR_DUPLICADOS,
    ELIMINAR_ITEMS_MARCADOS,
    GET_ACUERDOS_COMERCIALES,
    COPY_ACUERDOS_COMERCIALES ,
    EDIT_ACUERDOS_COMERCIALES ,
    CREATE_ACUERDOS_COMERCIALES
} from './constans';

export const INITIAL_STATE = {
    arrayAcuerdos: [],
    subMarcaArray:[],
    productoArray:[],
    arrayFilter:[],
    productsfilted:[],
    marcadosArray:[],
    listAcuerdosCom:[],
    createAcuerdoRespon: [],
    editAcuerdoRespon: [],
    copyAcuerdo: []

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ACUERDOS:
            return {...state, arrayAcuerdos: action.payload};
        case GET_SUBMARCAS:
            return {...state, subMarcaArray: action.payload};
        case GET_CATALOGO:
            return {...state, productoArray: action.payload};
        case ITEMS_MARCADOS:
            return {...state, marcadosArray: [...state.marcadosArray, action.payload] };
        case ELIMINAR_ITEMS_MARCADOS:
            return {...state, marcadosArray: action.payload };
        case ELIMINAR_DUPLICADOS:
            return {...state, productsfilted:  action.payload}
        case GET_ACUERDOS_COMERCIALES:
            return {...state, listAcuerdosCom:  action.payload}
        case CREATE_ACUERDOS_COMERCIALES:
            return {...state, createAcuerdoRespon:  action.payload}
        case EDIT_ACUERDOS_COMERCIALES:
            return {...state, editAcuerdoRespon:  action.payload}
        case COPY_ACUERDOS_COMERCIALES:
            return {...state, copyAcuerdo:  action.payload}
        case PRODUCTOS_FILTRADOS:
            return {
                ...state,
                productsfilted:  action.payload
            };
        default:
            return state;
    }
};