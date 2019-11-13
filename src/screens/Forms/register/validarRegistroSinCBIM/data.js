import * as Yup from 'yup';

export const formData = [
	// Cliente
	{name:"codcli_cbim", type:"Integer", 
		validation:Yup.number().integer().required("El código CBIM del cliente es obligatorio")},
	{name:"nomcli_cbim", type:"String", validation: undefined},
	{name:"cliente_nombre", type:"String", validation: undefined},
	{name:"cliente_apellido1", type:"String", validation: undefined},
	{name:"cliente_apellido2", type:"String", validation: undefined},
	{name:"cliente_nif", type:"String", validation: undefined},
	{name:"cliente_email", type:"String", validation: undefined},
	{name:"cliente_telefono", type:"String", validation: undefined},
	{name:"ind_acepta_emailcomercial", type:"Boolean", validation: undefined},
	// Entidad
	{name:"codentidad_cbim", type:"Integer", 
		validation:Yup.number().integer().required("El código CBIM de la entidad es obligatorio")},
	{name:"nomentidad_cbim", type:"String", validation: undefined},
	{name:"entidad_nif", type:"String", validation: undefined},
	{name:"entidad_tipo", type:"String", validation: undefined},
	{name:"entidad_telefono", type:"String", validation: undefined},
	{name:"direccion", type:"String", validation: undefined},
	{name:"poblacion", type:"String", validation: undefined},
	{name:"codigo_postal", type:"String", validation: undefined},
	{name:"provincia", type:"String", validation: undefined},
	{name:"entidad_email", type:"String", validation: undefined},
	{name:"coddelegado", type:"Integer", validation: undefined},
	{name:"nombre_delegado", type:"String", validation: undefined},
	{name:"aceptado", type:"Boolean", validation: undefined},
];
