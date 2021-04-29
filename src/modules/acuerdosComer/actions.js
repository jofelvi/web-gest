import {
    GET_ACUERDOS,
    GET_SUBMARCAS,
    GET_CATALOGO,
    ITEMS_MARCADOS,
    PRODUCTOS_FILTRADOS,
    ELIMINAR_DUPLICADOS, ELIMINAR_ITEMS_MARCADOS, GET_ACUERDOS_COMERCIALES,
    COPY_ACUERDOS_COMERCIALES,
    EDIT_ACUERDOS_COMERCIALES,
    CREATE_ACUERDOS_COMERCIALES, GET_DELEGADOS, COD_CLIENT, ACUERDO_AC, CREATE_ACUERDOS_COMERCIALES_SUCCESS
} from './constans';
import axios from 'axios'
import utils from "../../lib/utils";

let token = utils.getAuthToken()

export const getAcuerdosComerciales = () => async (dispatch)  =>{

    let response = await axios.get('http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/acuerdo', {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
         }).then((response) => {
            dispatch({
                type: GET_ACUERDOS_COMERCIALES,
                payload: response.data
            })
        }).catch((error) => {
            console.log("mensaje de error llamada API: ", error)
        })
}

export const getSubmarcas = () => async (dispatch)  =>{

    let response = await axios.get('http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/submarca', {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            dispatch({
                type: GET_SUBMARCAS,
                payload: response.data
            })

        })
        .catch((error) => {
            console.log("mensaje de error llamada API: ", error)
        })

}

export const getCatalogoProductos = () => async (dispatch)  =>{

    let response = await axios.get('http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/producto', {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            dispatch({
                type: GET_CATALOGO,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log("mensaje de error llamada API: ", error)
        })

}

export const listItemMarcados = (array) => async (dispatch)  =>{

    dispatch({
        type: ITEMS_MARCADOS,
        payload:  array
    })

}

export const productosFiltrados = (array) => async (dispatch)  =>{


    dispatch({
        type: PRODUCTOS_FILTRADOS,
        payload:  array
    })

}

export const eliminarDuplicados = (array) => async (dispatch)  =>{


    dispatch({
        type: ELIMINAR_DUPLICADOS,
        payload:  array
    })

}

export const eliminarItemsMarcados = (array) => async (dispatch)  =>{


    dispatch({
        type: ELIMINAR_ITEMS_MARCADOS,
        payload:  array
    })

}


export const createAcuerdosComerciales = (body) => async (dispatch)  =>{

    let response = await axios.post('http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/acuerdo/create', body ,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log("crear acuerdo done")
        dispatch({
            type: CREATE_ACUERDOS_COMERCIALES,
            payload: response.data
        })
        let a = response.data ? dispatch({
            type: CREATE_ACUERDOS_COMERCIALES_SUCCESS,
            payload: true
        }) : null
    }).catch((error) => {
        console.log("mensaje de error llamada API: ", error)
    })
}



export const editAcuerdosComerciales = (body, id) => async (dispatch)  =>{

    let response = await axios.post(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/acuerdo/${id}`, body ,{
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log("crear acuerdo done")
        dispatch({
            type: CREATE_ACUERDOS_COMERCIALES,
            payload: response.data
        })
    }).catch((error) => {
        console.log("mensaje de error llamada API: ", error)
    })
}

export const getByIdAcuerdoComerciale = (id) =>async  (dispatch)  =>{

   console.log("funcion llamar api", id)
    let response = await axios.get(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/acuerdo/${id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log("getByIdAcuerdoComerciale acuerdo done")
        console.log(response.data)
        dispatch({
            type: ACUERDO_AC,
            payload: response.data
        })
    }).catch((error) => {
        console.log("mensaje de error llamada API: ", error)
    })
}


export const getDelegado = () =>async  (dispatch)  =>{

    console.log("funcion llamar api")
    let response = await axios.get(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/delegado` ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log("getDelegado acuerdo done")
        console.log("getDelegado " , response.data)
        dispatch({
            type: GET_DELEGADOS,
            payload: response.data
        })
    }).catch((error) => {
        console.log("mensaje de error llamada API: ", error)
    })
}

export const setCodCliente = (cod) =>async  (dispatch)  => {

    dispatch({
        type: COD_CLIENT,
        payload: cod
    })
}