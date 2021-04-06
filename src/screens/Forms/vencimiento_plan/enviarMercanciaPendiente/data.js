// Datos esperados del proceso
export const formData = [
	{name:"codcli_cbim", type:"Integer", validation:undefined,
		defaultValue:'', label:'Cód. Cliente', visible:false},
	{name:"estado", type:"String", validation:undefined,
		defaultValue:'', label:'Estado', visible:true},
	{name:"fecha_fin", type:"String", validation:undefined, defaultValue:'',
		label:'Fecha Fin', visible:true},
	{name:"fecha_inicio", type:"String", validation:undefined,
		defaultValue:'', label:'Fecha Inicio', visible:true},
	{name:"ind_regularizar", type:"Boolean", validation:undefined,
		defaultValue:true, label:'Forzar Mcía. Pte.', visible:true},
	{name:"ind_renovar", type:"Boolean", validation:undefined,
		defaultValue:true, label:'Reno. Atomáti.', visible:true},
	{name:"margen", type:"Double", validation:undefined,
		defaultValue:'', label:'Margen', visible:true},
	{name:"nomcli_cbim", type:"String", validation:undefined,
		defaultValue:'', label:'Cliente', visible:true},
	{name:"plan_descripcion", type:"String", validation:undefined,
		defaultValue:'', label:'Descripción PC', visible:true},
	{name:"plan_nombre", type:"String", validation:undefined,
		defaultValue:'', label:'Nombre PC', visible:true},
	{name:"e1_udsmaximas",type:"Integer",  validation:undefined,
		defaultValue: '', label:'Unidades comprometidas', visible:true},
	{name:"e1_descuento",type:"Double",  validation:undefined,
		defaultValue: '', label:'Descuento', visible:true},
	{name:"e2_udsmaximas",type:"Integer",  validation:undefined,
		defaultValue: '', label:'Unidades comprometidas', visible:true},
	{name:"e2_descuento",type:"Double",  validation:undefined,
		defaultValue: '', label:'Descuento', visible:true},
	{name:"lineas",type:"Integer",  validation:undefined,
		defaultValue: '', label:'', visible:false}
];
// Describe cada uno de los campos que forman un plan de compra
export const formDataItem = [
	{name:"idproducto", type:"Integer",  validation:undefined,
		defaultValue: ''},
	{name:"nombre", type:"String",  validation:undefined,
		defaultValue: ''},
	{name:"udscompradas", type:"Integer",  validation:undefined,
		defaultValue: 0},
	{name:"udsregularizar", type:"Integer",  validation:undefined,
		defaultValue: 0}
];

export const processData = formData;
// Definición de la tabla de productos del plan de compra
export const tableCols = (tipo) => {
	let cols = [];
	cols.push({ title: "Producto", dataIndex: "nombre", key: "nombre", 
		render: (text) => { return !text || text === ''? 'N.D.': text; }});
	cols.push({ title: "Uds. Compradas", dataIndex: "udscompradas",
		key: "udscompradas", align: "center", editable: false, width: 100});
	cols.push({ title: "Mcía. Pte.", dataIndex: "udsregularizar",
		key: "udsregularizar", align: "center", editable: true, width: 100,
		sortOrder: 'descend', sorter: (a, b) => a.udsregularizar - b.udsregularizar });
	return cols;
}
