export const formData = {
	// Variable con los datos del proceso
	taskData: {},
	// Variable para controlar la carga de la combo de entidades
	loadingSearch: false,
	// Variable con los datos de la entidad seleccionada de la combo
	entidadCbim: {},
}

export const processData = [
	{ name: 'idcliente', type: 'String', validation: undefined },
	{ name: 'cliente_email', type: 'String', validation: undefined },
	{ name: 'commerce_remote_provider', type: 'String', validation: undefined },
	{ name: 'user_uuid', type: 'String', validation: undefined },
	{ name: 'codentidad_cbim', type: 'Integer', validation: undefined, },
	{ name: 'nomentidad_cbim', type: 'String', validation: undefined },
	{ name: 'entidad_nif', type: 'String', validation: undefined },
	{ name: 'direccion', type: 'String', validation: undefined },
	{ name: 'codigo_postal', type: 'String', validation: undefined },
	{ name: 'poblacion', type: 'String', validation: undefined },
	{ name: 'provincia', type: 'String', validation: undefined },
	{ name: 'entidad_telefono', type: 'String', validation: undefined },
	{ name: 'ind_esfarmacia', type: 'Boolean', validation: undefined },
	{ name: 'aceptado', type: 'Boolean', validation: undefined },
]
