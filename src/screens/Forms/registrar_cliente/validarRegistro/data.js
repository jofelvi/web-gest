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
	{ name: 'codcli_cbim', type: 'Integer', validation: undefined, label: 'Código Cliente CBIM' , visible: true},
	{ name: 'nomcli_cbim', type: 'String', validation: undefined,  label: 'Nombre Cliente CBIM', visible: true},
	{ name: 'cliente_nombre', type: 'String', validation: undefined, label: 'Nombre Cliente', visible: true},
	{ name: 'cliente_apellido1', type: 'String', validation: undefined, label: 'Primer apellido Cliente ', visible: true },
	{ name: 'cliente_apellido2', type: 'String', validation: undefined , label: 'Segundo apellido Cliente', visible: true},
	{ name: 'cliente_nif', type: 'String', validation: undefined, label: 'NIF Cliente' , visible: true},
	{ name: 'cliente_email', type: 'String', validation: undefined, label: 'Email Cliente', visible: true },
	{ name: 'cliente_telefono', type: 'String', validation: undefined,  label: 'Teléfono Cliente', visible: true},
	{ name: 'ind_acepta_emailcomercial', type: 'Boolean', validation: undefined, label: 'Acepta email comercial', visible: true },
	// Entidad
	{ name: 'codentidad_cbim', type: 'Integer', validation: undefined, label: 'Código Entidad CBIM' , visible: true },
	{ name: 'nomentidad_cbim', type: 'String', validation: undefined, label: 'Nombre Entidad CBIM' , visible: true },
	{ name: 'entidad_nif', type: 'String', validation: undefined, label: 'NIF Entidad' , visible: true },
	{ name: 'ind_esfarmacia', type: 'Boolean', validation: undefined, label: 'Tipo de Entidad' , visible: true },
	{ name: 'entidad_telefono', type: 'String', validation: undefined, label: 'Teléfono Entidad' , visible: true },
	{ name: 'entidad_email', type: 'String', validation: undefined, label: 'Email Entidad' , visible: true },
	{ name: 'direccion', type: 'String', validation: undefined, label: 'Dirección Entidad' , visible: true },
	{ name: 'poblacion', type: 'String', validation: undefined, label: 'Población Entidad' , visible: true },
	{ name: 'codigo_postal', type: 'String', validation: undefined, label: 'C.P. Entidad' , visible: true},
	{ name: 'provincia', type: 'String', validation: undefined, label: 'Provincia Entidad' , visible: true },
	{ name: 'coddelegado', type: 'Integer', validation: undefined, label: 'Código de delegado' , visible: true },
	{ name: 'nombre_delegado', type: 'String', validation: undefined, label: 'Nombre de delegado' , visible: true },
	{ name: 'tipo', type: 'String', validation: undefined, label: 'Tipo de Entidad' , visible: true },
	{ name: 'aceptado', type: 'Boolean', validation: undefined, label: 'Aceptado' , visible: true },
]
