import { get } from '../../lib/restClient'

export const getClienteCBIM = nombreComo =>
	get(`ntr/clientecbim?nombreComo=${nombreComo}`)

export const getClienteCBIMEntidades = codcli_cbim =>
	get(`ntr/clientecbim/entidad?codcli_cbim=${codcli_cbim}`)
