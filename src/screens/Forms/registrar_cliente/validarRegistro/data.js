export const formData = {
	// Variable con los datos del proceso
	taskData: {},
	// Variable para controlar la carga de la combo de busqueda
	loadingSearch: false,
	// Datos del cliente CBIM seleccionado del buscador
	clienteCbim: {},
}

export const processData = [
	// Cliente
	{ name: 'codcli_cbim', type: 'Integer', validation: undefined, },
	{ name: 'nomcli_cbim', type: 'String', validation: undefined, },
	{ name: 'cliente_nombre', type: 'String', validation: undefined, },
	{ name: 'cliente_apellido1', type: 'String', validation: undefined, },
	{ name: 'cliente_apellido2', type: 'String', validation: undefined },
	{ name: 'cliente_nif', type: 'String', validation: undefined, },
	{ name: 'cliente_email', type: 'String', validation: undefined, },
	{ name: 'cliente_telefono', type: 'String', validation: undefined, },
	{ name: 'ind_acepta_emailcomercial', type: 'Boolean', validation: undefined, },
	// Entidad
	{ name: 'codentidad_cbim', type: 'Integer', validation: undefined, },
	{ name: 'nomentidad_cbim', type: 'String', validation: undefined, },
	{ name: 'entidad_nif', type: 'String', validation: undefined },
	{ name: 'ind_esfarmacia', type: 'Boolean', validation: undefined, },
	{ name: 'entidad_telefono', type: 'String', validation: undefined, },
	{ name: 'entidad_email', type: 'String', validation: undefined, },
	{ name: 'direccion', type: 'String', validation: undefined },
	{ name: 'poblacion', type: 'String', validation: undefined },
	{ name: 'codigo_postal', type: 'String', validation: undefined, },
	{ name: 'provincia', type: 'String', validation: undefined },
	{ name: 'coddelegado', type: 'Integer', validation: undefined },
	{ name: 'nombre_delegado', type: 'String', validation: undefined },
	{ name: 'tipo', type: 'String', validation: undefined },
	{ name: 'aceptado', type: 'Boolean', validation: undefined },
]
