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
	{ name: 'cliente_nombre', type: 'String', validation: undefined, label: 'Nombre Cliente', visible: true},
	{ name: 'cliente_apellido1', type: 'String', validation: undefined, label: 'Primer apellido', visible: true },
	{ name: 'cliente_apellido2', type: 'String', validation: undefined , label: 'Segundo apellido', visible: true},
	{ name: 'cliente_nif', type: 'String', validation: undefined, label: 'NIF' , visible: true},
	{ name: 'cliente_email', type: 'String', validation: undefined, label: 'Email', visible: true },
	{ name: 'cliente_telefono', type: 'String', validation: undefined,  label: 'Teléfono', visible: true},
	{ name: 'codcli_cbim', type: 'Integer', validation: undefined, label: 'Código Cliente CBIM' , visible: false},
	{ name: 'nomcli_cbim', type: 'String', validation: undefined,  label: 'Nombre Cliente CBIM', visible: false},
	// Entidad
	{ name: 'nomentidad_cbim', type: 'String', validation: undefined, label: 'Nombre Entidad' , visible: true },
	{ name: 'entidad_nif', type: 'String', validation: undefined, label: 'NIF Entidad' , visible: true },
	{ name: 'ind_esfarmacia', type: 'Boolean', validation: undefined, label: 'Es farmacia' , visible: true },// mostrar datos?
	{ name: 'direccion', type: 'String', validation: undefined, label: 'Dirección Entidad' , visible: true },
	{ name: 'provincia', type: 'String', validation: undefined, label: 'Provincia' , visible: true },
	{ name: 'poblacion', type: 'String', validation: undefined, label: 'Población Entidad' , visible: true },
	{ name: 'codigo_postal', type: 'String', validation: undefined, label: 'C.P. Entidad' , visible: true},
	{ name: 'coddelegado', type: 'Integer', validation: undefined, label: 'Código de delegado' , visible: true },
	{ name: 'nombre_delegado', type: 'String', validation: undefined, label: 'Nombre de delegado' , visible: true },
	// Cliente
	{ name: 'ind_acepta_emailcomercial', type: 'Boolean', validation: undefined, label: 'Acepta email comercial', visible: true },
	// Entidad
	{ name: 'codentidad_cbim', type: 'Integer', validation: undefined, label: 'Código Entidad CBIM' , visible: false },
	{ name: 'entidad_telefono', type: 'String', validation: undefined, label: 'Teléfono Entidad' , visible: false },
	{ name: 'entidad_email', type: 'String', validation: undefined, label: 'Email Entidad' , visible: false },
	{ name: 'tipo', type: 'String', validation: undefined, label: 'Tipo de Entidad' , visible: false },
	{ name: 'aceptado', type: 'Boolean', validation: undefined, label: 'Aceptado' , visible: false },
]
