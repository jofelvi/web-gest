import {
    NEW_GROUP,
    RELOAD_GROUP_LIST,
    SHOWMODAL_GRUPO_SUCCESS,
    EDIT_GROUP,
    ELIMINAR_DEPENDENCIAS,
} from "./constants.js"



export const INITIAL_STATE = {
    newGroup:[],
    success: false,
    editGroup:[],
    eliminarDepen:[],
    eliminarGrupo:[],
    codigodelError:''
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case NEW_GROUP:
            return{
                ...state,
                newGroup: action.payload,
            }
        case ELIMINAR_DEPENDENCIAS:
            return{
                ...state,
                eliminarDepen: action.payload,
            }
        case SHOWMODAL_GRUPO_SUCCESS:
            return{
                ...state,
                success: action.payload,
            }
        case EDIT_GROUP:
            return{
                ...state,
                editGroup: action.payload,
            }
        default:
            return state;
    }

}





