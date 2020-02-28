import { get, post } from '../../lib/restClient'

export const getClientsIndas = () => get('/ntr/cliente')

export const getEntitiesIndas = queryParams => {
	return !queryParams
		? get('/ntr/entidad')
		: get(`/ntr/entidad?${queryParams}`)
}
export const getWholesalersIndas = idEntity =>
	get(`/ntr/entidad/${idEntity}/mayorista`)

export const updateClientIndas = (idClient, data) =>
	post(`/ntr/cliente/${idClient}`, data)
export const updateEntitiyIndas = (idEntity, data) =>
	post(`/ntr/entidad/${idEntity}`, data)
