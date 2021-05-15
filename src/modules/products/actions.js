import {
    SHOWMODAL_GRUPO,
    SHOWMODAL_GRUPO_SUCCESS
} from "./constants.js"
import axios from 'axios';


export const activarModal = (visibleMG) => (dispatch) => {

        dispatch ({ 
            type: SHOWMODAL_GRUPO,
            payload: visibleMG
        })  
}


export const guardadoSuccess = (visibleGS) => (dispatch) => {

    dispatch ({ 
        type: SHOWMODAL_GRUPO_SUCCESS,
        payload: visibleGS
    })  
}
   
