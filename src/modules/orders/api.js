import { get } from '../../lib/restClient';
import {LIMIT} from '../../constants'

const generatingOffset = (page, offset)=>{
    let queryParams = '';
    const limit = LIMIT;
  if(page < 0){
    offset = 0
queryParams = `offset=${offset}&limit=${limit}`
}else if(page === 0){
  offset = 0
  queryParams = `offset=${offset}&limit=${limit}`
}else{
  queryParams = `offset=${offset}&limit=${limit}`
}
return queryParams;
}


export const fetchOrders = async (page) => { 
  let offset;
  offset = page;
  let queryParams = generatingOffset(page, offset)
  return get(`ntr/pedido?${queryParams}`);

}


export const searchOrder = async ({
  codentidad_cbim, codcli_cbim, tipo, pages, fecha_desde, fecha_hasta, dates
}) => {
    
  let offset;
  offset = pages;
  
let queryParams = generatingOffset(pages, offset)
   
  //BY DATE
  if (dates[0]) {
    queryParams += `&fecha_desde=${dates[0]}`;
  }
  if (dates[1]) {
    queryParams += `&fecha_hasta=${dates[1]}`;
  }
  //BY TYPE
  if (tipo) {
    tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1)
    queryParams += `&tipo=${tipo}`;
  }
  //BY CLIENT
  if (codcli_cbim) {
    queryParams += `&codcli_cbim=${codcli_cbim}`;
  }
  //BY ENTITY
  if (codentidad_cbim) {
    queryParams += `&codentidad_cbim=${codentidad_cbim}`;
  }
  return get(`ntr/pedido?${queryParams}`);
};


export const fetchClientById = (idClient) => get(`/ntr/cliente/${idClient}`);


export const fetchEntityById = (idEntity) => get(`/ntr/entidad/${idEntity}`);


export const fetchOrderById = (idOrder) => get(`/ntr/pedido/${idOrder}`);

export const fetchProductById = (idProduct) => get(`/ntr/producto/${idProduct}`);