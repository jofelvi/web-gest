import * as Yup from 'yup';

// Datos esperados del proceso
export const formData = [
	{name:"codcli_cbim",         type:"Integer", validation:undefined, defaultValue: ''},
	{name:"nomcli_cbim",         type:"String",  validation:undefined, defaultValue: ''},
	{name:"drupal_order_id",     type:"String",  validation:undefined, defaultValue: ''},
	{name:"drupal_uuid",         type:"String",  validation:undefined, defaultValue: ''},
	{name:"codpedido_origen",    type:"String",  validation:undefined, defaultValue: ''},
	{name:"origen",              type:"String",  validation:undefined, defaultValue: ''},
	{name:"idPedido",            type:"Integer", validation:undefined, defaultValue: ''},
	{name:"fecha_alta",          type:"Date",    validation:undefined, defaultValue: ''},
	{name:"codentidad_cbim",     type:"Integer", validation:undefined, defaultValue: ''},
	{name:"nomentidad_cbim",     type:"String",  validation:undefined, defaultValue: ''},
	{name:"ind_esfarmacia",      type:"Boolean", validation:undefined, defaultValue: false},
	{name:"nombre_estado",       type:"String",  validation:undefined, defaultValue: ''},
	{name:"codcupon",            type:"String",  validation:undefined, defaultValue: ''},
	{name:"codmayorista",        type:"Integer", validation:undefined, defaultValue: ''},
	{name:"nombre_mayorista",    type:"String",  validation:undefined, defaultValue: ''},
	{name:"mensaje_error",       type:"String",  validation:undefined, defaultValue: ''},
// Número de items del pedido
	{name:"lineas",              type:"Integer", validation:undefined, defaultValue: ''},
	{name:"tipo",                type:"String",  validation:undefined, defaultValue: ''},
	{name:"aceptado",            type:"Boolean", validation: undefined, defaultValue: false},
	{name:"actualizado",         type:"Boolean", validation: undefined, defaultValue: false},
];
// Describe cada uno de los campos que forman una linea de pedido
export const formDataItem = [
	{name:"drupal_order_item_id",type:"String",  validation:undefined, defaultValue: ''},
	{name:"drupal_uuid",         type:"String",  validation:undefined, defaultValue: ''},
	{name:"codindas",            type:"String",  validation:undefined, defaultValue: ''},
	{name:"nombre",              type:"String",  validation:undefined, defaultValue: ''},
	{name:"cantidad",            type:"Integer", validation:undefined, defaultValue: 0},
  {name:"descuento",           type:"Double",  validation:undefined, defaultValue: 0},
	{name:"puntos",              type:"Integer", validation:undefined, defaultValue: 0},
	{name:"codnacional",         type:"String",  validation:undefined, defaultValue: ''},
];
// Definición de la tabla de pedidos
export const tableCols = (tipo) => {
	let cols = [];
	const esPedido = typeof tipo === "string" && tipo.search(/pedidos/i) !== -1;
	console.log("tableCols.tipo: ", tipo, " esPedido: " , esPedido);
	cols.push({ title: "Item", key: "index", align: "center", render: (text, record, index) => index + 1, });
	cols.push({ title: "Cód INDAS", dataIndex: "codindas", key: "codindas", align: "center", });
	cols.push({ title: "Producto", dataIndex: "nombre", key: "nombre", 
							render: (text) => { return !text || text == ''? 'N.D.': text; }, ellipsis: true, });
	cols.push({ title: "Unidades", dataIndex: "cantidad", key: "cantidad", align: "center", editable: true, });
	if(esPedido)
		cols.push({ title: "Dto (%)", dataIndex: "descuento", key: "descuento", align: "center", 
							  render: (text) => {return !text || text == ''? '': text + ' %'; }, editable: true, });
	cols.push({ title: esPedido? "Puntos acumulados": "Puntos coste", 
							dataIndex: "puntos", key: "puntos", align: "center", editable: true, });
	console.log("tableCols.return: ", cols);
	return cols;
}
