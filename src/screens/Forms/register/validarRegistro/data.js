import * as Yup from 'yup';

export const formData = [
	// Cliente
	{name:"codcli_cbim", type:"Integer", validation:Yup.number().integer().required()},
	{name:"nomcli_cbim", type:"String", validation:Yup.string().required()},
	{name:"cliente_nombre", type:"String", validation:Yup.string().required()},
	{name:"cliente_apellido1", type:"String", validation:Yup.string().required()},
	{name:"cliente_apellido2", type:"String", validation: undefined},
	{name:"cliente_nif", type:"String", validation:Yup.string().required()},
	{name:"cliente_email", type:"String", validation:Yup.string().required()},
	{name:"cliente_telefono", type:"String", validation:Yup.string().required()},
	{name:"ind_acepta_emailcomercial", type:"Integer", validation:undefined},
	// Entidad
	{name:"codentidad_cbim", type:"Integer", validation:Yup.number().integer().required()},
	{name:"nomentidad_cbim", type:"String", validation:Yup.string().required()},
	{name:"entidad_nif", type:"String", validation: undefined},
	{name:"entidad_tipo", type:"String", validation:Yup.string().required()},
	{name:"entidad_telefono", type:"String", validation:Yup.string().required()},
	{name:"direccion", type:"String", validation:Yup.string().required()},
	{name:"poblacion", type:"String", validation:Yup.string().required()},
	{name:"codigo_postal", type:"String", validation:Yup.string().required()},
	{name:"provincia", type:"String", validation:Yup.string().required()},
	{name:"entidad_email", type:"String", validation: undefined},
	{name:"coddelegado", type:"Integer", validation: undefined},
	{name:"nombre_delegado", type:"String", validation: undefined},
	{name:"aceptado", type:"Boolean", validation: undefined},
];
