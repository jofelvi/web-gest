import {
    SHOWMODAL_GRUPO,
    SHOWMODAL_GRUPO_SUCCESS,
    GET_ALL_PRODUCTS,
    EDIT_PRODUCT,
    GET_PRODUCT_BLOQ_MAYORISTA,
    GET_MAYORISTAS,
    NEW_BLQUEO,
    ELIMINAR_BLOQUEOS,
    ELIMINAR_UN_BLOQUEO,

} from "./constants.js"



export const INITIAL_STATE = {
    showModal: false,
    success: false,
    getAllProducts:[],
    editProduct:[],
    getProductBloMay:[],
    getMayoristas:[],
    newBloqueo:'',
    eliminarBloqueos:'',
    eliminarUnBloqueo:[],

}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case ELIMINAR_UN_BLOQUEO:
            return{
                ...state,
                eliminarUnBloqueo: action.payload,
            }
        case SHOWMODAL_GRUPO:
            return{
                ...state,
                showModal: action.payload,
            }
        case SHOWMODAL_GRUPO_SUCCESS:
            return{
                ...state,
                success: action.payload,
            }
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                getAllProducts: action.payload,
            }
        case EDIT_PRODUCT:
            return{
                ...state,
                editProduct: action.payload,
            }
        case NEW_BLQUEO:
            return{
                ...state,
                newBloqueo: action.payload,
            }
        case GET_PRODUCT_BLOQ_MAYORISTA:
            return{
                ...state,
                getProductBloMay: action.payload,
            }
        case GET_MAYORISTAS:
            return{
                ...state,
                getMayoristas: action.payload,
            }
        case ELIMINAR_BLOQUEOS:
            return{
                ...state,
                eliminarBloqueos: action.payload,
            }
            
        default:
            return state;
    }

}





