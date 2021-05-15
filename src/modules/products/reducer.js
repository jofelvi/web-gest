import {
    SHOWMODAL_GRUPO,
    SHOWMODAL_GRUPO_SUCCESS
} from "./constants.js"



export const INITIAL_STATE = {
    showModal: false,
    success: false
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
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
    
        default:
            return state;
    }

}





