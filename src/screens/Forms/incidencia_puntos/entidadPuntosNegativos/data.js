export const formData = {
	// Variable con los datos del proceso
	taskData: {},
	// Variable para controlar la carga de la combo de entidades
	loadingSearch: false,
	// Variable con los datos de la entidad seleccionada de la combo
	entidadCbim: {},
}

export const processData = [
	{ name: 'codcli_cbim', type: 'Integer', validation: undefined, label: "Código Cliente", visible: false },
	{ name: 'nomcli_cbim', type: 'String', validation: undefined, label: "Nombre Cliente", visible: false },
	{ name: 'fecha_alta', type: 'String', validation: undefined, label: "Fecha de alta", visible: false },
	{ name: 'cliente_estado', type: 'String', validation: undefined, label: "Estado Cliente", visible: false  },
	{ name: 'cliente_email', type: 'String', validation: undefined, label: "Email", visible: false  },
	{ name: 'codentidad_cbim', type: 'Integer', validation: undefined, label: "Código Entidad", visible: true  },
	{ name: 'nomentidad_cbim', type: 'String', validation: undefined, label: "Nombre Entidad", visible: true  },
	{ name: 'puntos', type: 'Integer', validation: undefined, label: "Puntos", visible: true  },
	{ name: 'ind_esfarmacia', type: 'Boolean', validation: undefined, label: "ind es farmacia" , visible: false },
	{ name: 'entidad_estado', type: 'String', validation: undefined, label: "Estado Entidad", visible: false  },
	{ name: 'direccion', type: 'String', validation: undefined, label: "Dirección", visible: true  },
	{ name: 'codigo_postal', type: 'String', validation: undefined, label: "Código Postal", visible: true  },
	{ name: 'poblacion', type: 'String', validation: undefined, label: "Población", visible: true  },
	{ name: 'provincia', type: 'String', validation: undefined, label: "Provincia", visible: true  },
	{ name: 'mensaje_error', type: 'String', validation: undefined, label: "Mensaje de error", visible: false  }
]
