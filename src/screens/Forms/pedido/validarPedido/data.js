import * as Yup from 'yup';

// Datos esperados del proceso
export const formData = [
	{name:"codcli_cbim",         type:"Integer", validation:undefined, defaultValue: ''},
	{name:"nomcli_cbim",         type:"String",  validation:undefined, defaultValue: ''},
	{name:"drupal_order_id",     type:"Integer", validation:undefined, defaultValue: ''},
	{name:"origen",              type:"String",  validation:undefined, defaultValue: ''},
	{name:"fecha_alta",          type:"Date",    validation:undefined, defaultValue: ''},
	{name:"codentidad_cbim",     type:"Integer", validation:undefined, defaultValue: ''},
	{name:"nomentidad_cbim",     type:"String",  validation:undefined, defaultValue: ''},
	{name:"codestado",           type:"String",  validation:undefined, defaultValue: ''},
	{name:"nomestado",           type:"String",  validation:undefined, defaultValue: ''},
	{name:"codcupon",            type:"String",  validation:undefined, defaultValue: ''},
	{name:"codmayorista",        type:"Integer", validation:undefined, defaultValue: ''},
	{name:"mensaje_error",       type:"String",  validation:undefined, defaultValue: ''},
// Número de items del pedido
	{name:"lineas",              type:"Integer", validation:undefined, defaultValue: ''},
	{name:"tipo",                type:"String",  validation:undefined, defaultValue: ''},
	{name:"aceptado",            type:"Boolean", validation: undefined, defaultValue: ''},
];
// Describe cada uno de los campos que forman una linea de pedido
export const formDataItem = [
	{name:"drupal_order_item_id",type:"Strng",   validation:undefined, defaultValue: ''},
	{name:"codindas",            type:"String",  validation:undefined, defaultValue: ''},
	{name:"nomproducto",         type:"String",  validation:undefined, defaultValue: ''},
	{name:"cantidad",            type:"Double",  validation:undefined, defaultValue: 0},
  {name:"descuento",           type:"Double",  validation:undefined, defaultValue: 0},
	{name:"puntos",              type:"Integer", validation:undefined, defaultValue: 0},
];
// Definición de la tabla de pedidos
export const tableCols = [
	{ title: "Item",
		key: "index", 
		align: "center",
		render: (text, record, index) => index + 1,
	},
	{ title: "Cód INDAS",
		dataIndex: "codindas",
		key: "codindas", 
		align: "center",
	},
	{ title: "Producto",
		dataIndex: "nomproducto",
		key: "nomproducto", 
		render: (text) => { return !text || text == ''? 'N.D.': text; },
		ellipsis: true,
	},
	{ title: "Unidades",
		dataIndex: "cantidad",
		key: "cantidad", 
		align: "center",
		editable: true,
	},
	{ title: "Dto (%)",
		dataIndex: "descuento",
		key: "descuento", 
		align: "center",
		render: (text) => {return !text || text == ''? '': text + ' %'; },
		editable: true,
	},
	{ title: "Puntos",
		dataIndex: "puntos",
		key: "puntos", 
		align: "center",
		editable: true,
	}
];
