
// Datos esperados del proceso
export const formData = [
	{name:"codpedido_origen",    type:"String",  validation:undefined, defaultValue: '', label: 'Código Pedido' , visible: true},
	{name:"fecha_alta",          type:"String",  validation:undefined, defaultValue: '', label: 'Fecha de pedido' , visible: true},
	{name:"lineas",              type:"Integer", validation:undefined, defaultValue: '', label: 'Líneas' , visible: true},// Número de items del pedido
	{name:"tipo",                type:"String",  validation:undefined, defaultValue: '', label: 'Tipo' , visible: true},// Número de items del pedido
	{name:"nombre_estado",       type:"String",  validation:undefined, defaultValue: '', label: 'Estado' , visible: true},
	{name:"codcli_cbim",         type:"Integer", validation:undefined, defaultValue: '', label: 'Código Cliente CBIM' , visible: true},
	{name:"codentidad_cbim",     type:"Integer", validation:undefined, defaultValue: '', label: 'Código Entidad CBIM' , visible: true},
	{name:"nomentidad_cbim",     type:"String",  validation:undefined, defaultValue: '', label: 'Nombre Entidad CBIM' , visible: true},
	{name:"codmayorista",        type:"Integer", validation:undefined, defaultValue: '', label: 'Código Mayorista' , visible: true},
	{name:"nombre_mayorista",    type:"String",  validation:undefined, defaultValue: '', label: 'Nombre Mayorista' , visible: true},
	{name:"nomcli_cbim",         type:"String",  validation:undefined, defaultValue: '', label: 'Nombre Cliente CBIM' , visible: false},
	{name:"drupal_order_id",     type:"String",  validation:undefined, defaultValue: '', label: 'Drupal id pedido' , visible: false},
	{name:"drupal_uuid",         type:"String",  validation:undefined, defaultValue: '', label: 'Drupal uuid' , visible: false},
	{name:"origen",              type:"String",  validation:undefined, defaultValue: '', label: 'Origen' , visible: false},
	{name:"idpedido",            type:"Integer", validation:undefined, defaultValue: '', label: 'idpedido' , visible: false},
	{name:"ind_esfarmacia",      type:"Boolean", validation:undefined, defaultValue: false, label: 'Tipo de entidad' , visible: false},
	{name:"codcupon",            type:"String",  validation:undefined, defaultValue: '', label: 'Código Cupón' , visible: false},
	{name:"mensaje_error",       type:"String",  validation:undefined, defaultValue: '', label: 'Mensaje de error' , visible: false},
// Número de items del pedido
	{name:"aceptado",            type:"Boolean", validation: undefined, defaultValue: false, label: 'Aceptado' , visible: false},
	{name:"actualizado",         type:"Boolean", validation: undefined, defaultValue: false, label: 'Actualizado' , visible: false},
];
// Describe cada uno de los campos que forman una linea de pedido
export const formDataItem = [
	{name:"drupal_order_item_id",type:"String",  validation:undefined, defaultValue: ''},
	{name:"drupal_uuid",         type:"String",  validation:undefined, defaultValue: ''},
	{name:"codindas",            type:"String",  validation:undefined, defaultValue: ''},
	{name:"nombre",              type:"String",  validation:undefined, defaultValue: ''},
	{name:"cantidad",            type:"Integer", validation:undefined, defaultValue: 0},
    {name:"descuento",           type:"Double",  validation:undefined, defaultValue: 0},
	{name:"puntos_acumulados_unidad", type:"Integer", validation:undefined, defaultValue: 0},
	{name:"puntos_acumulados_total",  type:"Integer", validation:undefined, defaultValue: 0},
	{name:"puntos_coste_unidad",      type:"Integer", validation:undefined, defaultValue: 0},
	{name:"puntos_coste_total",       type:"Integer", validation:undefined, defaultValue: 0},
	{name:"codnacional",              type:"String",  validation:undefined, defaultValue: ''},
];
export const processData = formData;
// Definición de la tabla de pedidos
export const tableCols = (tipo) => {
	let cols = [];
	const esPedido = typeof tipo === "string" && tipo.search(/pedidos/i) !== -1;
	cols.push({ title: "Item", key: "index", align: "center", 
			        render: (text, record, index) => index + 1, width: 65});
	cols.push({ title: "Cód INDAS", dataIndex: "codindas", key: "codindas", 
		          align: "center", width: 102});
	cols.push({ title: "Producto", dataIndex: "nombre", key: "nombre", 
							render: (text) => { return !text || text === ''? 'N.D.': text; }, 
		          ellipsis: true, width: 230});
	cols.push({ title: "Unidades", dataIndex: "cantidad", key: "cantidad", 
		          align: "center", editable: true, width: 100});
	cols.push({ title: "Dto (%)", dataIndex: "descuento", key: "descuento", 
						  align: "center", 
							render: (text) => { 
								return  esPedido? !text || text === ''? '': text + '%': 'N/A'; }, 
							editable: esPedido? true: false, width: 100});
	if(esPedido) {
		cols.push({ title: "Puntos acumulados", 
								dataIndex: "puntos_acumulados_total", key: "puntos_acumulados_total", 
								align: "center", editable: false, width: 110});
	} else {
		cols.push({ title: "Puntos coste", 
								dataIndex: "puntos_coste_total", key: "puntos_coste_total", align: "center", 
								editable: false, width: 80});
	}
	return cols;
}

