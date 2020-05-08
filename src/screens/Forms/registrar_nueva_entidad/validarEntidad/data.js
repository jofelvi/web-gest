export const formData = {
	// Variable con los datos del proceso
	taskData: {},
	// Variable para controlar la carga de la combo de entidades
	loadingSearch: false,
	// Variable con los datos de la entidad seleccionada de la combo
	entidadCbim: {},
}

export const processData = [
	{ name: 'idcliente', type: 'String', validation: undefined , label: "Id cliente", visible: true},
	{ name: 'codcli_cbim', type: 'Integer', validation: undefined, label: "Códico CBIM", visible: true },
	{ name: 'cliente_email', type: 'String', validation: undefined, label: "Email", visible: true  },
	{ name: 'commerce_remote_provider', type: 'String', validation: undefined, label: "Remote provider", visible: true  },
	{ name: 'user_uuid', type: 'String', validation: undefined, label: "user uuid", visible: true  },
	{ name: 'codentidad_cbim', type: 'Integer', validation: undefined, label: "Código Entidad CBIM", visible: true  },
	{ name: 'nomentidad_cbim', type: 'String', validation: undefined, label: "Nombre entidad CBIM", visible: true  },
	{ name: 'nif', type: 'String', validation: undefined, label: "Nif", visible: true  },
	{ name: 'direccion', type: 'String', validation: undefined, label: "Dirección", visible: true  },
	{ name: 'codigo_postal', type: 'String', validation: undefined, label: "Código Postal", visible: true  },
	{ name: 'poblacion', type: 'String', validation: undefined, label: "Población", visible: true  },
	{ name: 'provincia', type: 'String', validation: undefined, label: "Provincia", visible: true  },
	{ name: 'telefono', type: 'String', validation: undefined, label: "Teléfono" , visible: true },
	{ name: 'ind_esfarmacia', type: 'Boolean', validation: undefined, label: "ind es farmacia" , visible: true },
	{ name: 'sanibrick', type: 'String', validation: undefined, label: "Sanibrick", visible: true  },
	{ name: 'coddelegado', type: 'Integer', validation: undefined, label: "Código delegado", visible: true  },
	{ name: 'aceptado', type: 'Boolean', validation: undefined, label: "Aceptado", visible: true  },
]
