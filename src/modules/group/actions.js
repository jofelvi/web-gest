import {
    NEW_GROUP,
    RELOAD_GROUP_LIST,
    SHOWMODAL_GRUPO_SUCCESS,
    ELIMINAR_DEPENDENCIAS,
} from "./constants.js"
import utils from "../../lib/utils"
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';


export const guardadoSuccess = (visibleGS) => (dispatch) => {

  dispatch ({ 
      type: SHOWMODAL_GRUPO_SUCCESS,
      payload: visibleGS
  })  
}



export const convertirPadre = (idGrupo,body) => async() => {
  let token = utils.getAuthToken()
  let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}ntr/grupo/${idGrupo}`, body ,{
      headers: {  
        'Content-Type': 'application/json',
         accept: 'application/json',
         Authorization: `Bearer ${token}` }
    }).then((response) => {
    }).catch((error) => { 
      console.log("mensaje de error llamada API: ",error)   
  })
}





export const editGroup = (idGrupo,body) => async() => {
  let token = utils.getAuthToken()
  let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}ntr/grupo/${idGrupo}`, body ,{
      headers: {  
        'Content-Type': 'application/json',
         accept: 'application/json',
         Authorization: `Bearer ${token}` }
    }).then((response) => {
    }).catch((error) => { 
      console.log("mensaje de error llamada API: ",error)   
  })
}

export const newGroup = (body) => async() => {
  let token = utils.getAuthToken()
  let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}ntr/grupo/create`, body ,{
      headers: {  
        'Content-Type': 'application/json',
         accept: 'application/json',
         Authorization: `Bearer ${token}` }
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => { 
      console.log("mensaje de error llamada API: ",error)  
  })
}





