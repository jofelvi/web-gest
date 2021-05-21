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
import utils from "../../lib/utils"
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


export const getProductRedux = () => async (dispatch)  => {
     let token = utils.getAuthToken()
     let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}ntr/producto`, {
        headers: {  
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        dispatch({ 
            type: GET_ALL_PRODUCTS,
            payload: response.data
        })   
        })
     .catch((error) => { 
        console.log("mensaje de error llamada API: ",error)   
         })
}

export const getMayoristas = () => async (dispatch)  => {
    let token = utils.getAuthToken()
    let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}ntr/mayorista`, {
       headers: {  
         'Content-Type': 'application/json',
         accept: 'application/json',
         Authorization: `Bearer ${token}` }
     })
     .then((response) => {
       dispatch({ 
           type: GET_MAYORISTAS,
           payload: response.data
       })   
       })
    .catch((error) => { 
       console.log("mensaje de error llamada API: ",error)   
        })
}

export const getProductBloqMayorista = (idProducto) => async (dispatch)  => {
    let token = utils.getAuthToken()
    let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}ntr/bloqueo-producto?idproducto=${idProducto}&activo=true`, {
       headers: {  
         'Content-Type': 'application/json',
         accept: 'application/json',
         Authorization: `Bearer ${token}` }
     })
     .then((response) => {
       dispatch({ 
           type: GET_PRODUCT_BLOQ_MAYORISTA,
           payload: response.data
       })   
       })
    .catch((error) => { 
       console.log("mensaje de error llamada API: ",error)   
        })
}


export const editProduct = (idProducto,body) => async() => {
      let token = utils.getAuthToken()
      let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}ntr/producto/${idProducto}`, body ,{
          headers: {  
            'Content-Type': 'application/json',
             accept: 'application/json',
             Authorization: `Bearer ${token}` }
        }).then((response) => {
        }).catch((error) => { 
          console.log("mensaje de error llamada API: ",error)   
      })
}

export const eliminarUnB = (idBloqueo,body) => async() => {
    let token = utils.getAuthToken()
    let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}ntr/bloqueo-producto/${idBloqueo}`, body ,{
        headers: {  
          'Content-Type': 'application/json',
           accept: 'application/json',
           Authorization: `Bearer ${token}` }
      }).then((response) => {
      }).catch((error) => { 
        console.log("mensaje de error llamada API: ",error)   
    })
}

export const newBloqueo = (body) => async() => {
    let token = utils.getAuthToken()
    let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}ntr/bloqueo-producto/create`, body ,{
        headers: {  
          'Content-Type': 'application/json',
           accept: 'application/json',
           Authorization: `Bearer ${token}` }
      }).then((response) => {
        // console.log(response.data)
      }).catch((error) => { 
        console.log("mensaje de error llamada API: ",error)  
    })
}

export const eliminarBloqueosM = (idProducto,body) => async() => {
    let token = utils.getAuthToken()
    let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}ntr/bloqueo-producto/${idProducto}/desactivar`,body,{
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
