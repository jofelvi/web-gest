import { get, del, post } from '../../lib/restClient';
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


export const countOrders = async ({
    codentidad_cbim, codpedido_origen, codcli_cbim, tipo, dates, codestado, idproducto
}) => {

  let queryParams = ''

  //BY DATE
  if (dates[0]) {
    queryParams += `&fecha_desde=${dates[0]}`;
  }
  if (dates[1]) {
    queryParams += `&fecha_hasta=${dates[1]}`;
  }
  //BY idproducto
  if (idproducto) {
    queryParams += `&idproducto=${idproducto}`;
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
  //BY CLIENT
  if (codestado) {
    queryParams += `&codestado=${codestado}`;
  }

  //BY ENTITY
  if (codentidad_cbim) {
    queryParams += `&codentidad_cbim=${codentidad_cbim}`;
  }
  //BY COD PEDIDO
  if (codpedido_origen) {
    queryParams += `&codpedido_origen=${codpedido_origen}`;
  }
  return get(`ntr/pedido/count?${queryParams}`);
};

export const searchOrder = async ({
  codentidad_cbim, codpedido_origen, codcli_cbim, tipo, pages, dates, codestado, idproducto
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
  //BY idproducto
  if (idproducto) {
    queryParams += `&idproducto=${idproducto}`;
  }
  //BY CLIENT
  if (codcli_cbim) {
    queryParams += `&codcli_cbim=${codcli_cbim}`;
  }
  //BY CLIENT
  if (codestado) {
    queryParams += `&codestado=${codestado}`;
  }

  //BY ENTITY
  if (codentidad_cbim) {
    queryParams += `&codentidad_cbim=${codentidad_cbim}`;
  }
  //BY COD PEDIDO
  if (codpedido_origen) {
    queryParams += `&codpedido_origen=${codpedido_origen}`;
  }
  return get(`ntr/pedido?${queryParams}`);
};


export const fetchClientById = (idClient) => get(`/ntr/cliente/${idClient}`);


export const fetchEntityById = (idEntity) => get(`/ntr/entidad/${idEntity}`);


export const fetchOrderById = (idOrder) => get(`/ntr/pedido/${idOrder}`);
export const fetchOrderStates = () => get(`/ntr/pedido/estados`);
export const fetchOrderProducts = () => get(`/ntr/producto`);

//export const deleteOrderLineById = (idOrder, idProduct) => del(`/ntr/linea_pedido/${idOrder}/producto/${idProduct}`);
export const deleteOrderLineById = (idOrder, idProduct) => post(`/procdef/cancelar_linea_pedido/launch`, [{ name: 'codpedido_origen', value: idOrder},{ name: 'idproducto', value: idProduct},{ name: 'origen', value: "NTR-G" }]);

export const deleteOrderById = (idOrder, status) => post(`/procdef/modificar_estado_pedido/launch`, [{name: 'codpedido_origen', value: idOrder}, {name: 'codestado', value: 'canceled'}, {name: 'origen', value: 'NTR-G' }]);
//export const changeOrderStatusById = (idOrder, status) => post(`ntr/pedido/${idOrder}/estado`, {codestado: status });
export const changeOrderStatusById = (idOrder, status) => post(`/procdef/modificar_estado_pedido/launch`, [{name: 'codpedido_origen', value: idOrder}, {name: 'codestado', value: status}, {name: 'origen', value: 'NTR-G' }]);