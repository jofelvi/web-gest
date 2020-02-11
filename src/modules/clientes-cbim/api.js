import { get } from '../../lib/restClient'

export const getClienteCBIM = nombreComo => 
	get(`ntr/clientecbim?nombreComo=${nombreComo}`)

