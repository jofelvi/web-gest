import { get, post, put } from '../../lib/restClient';
import { NUM_CLIENTES_PAG } from './constants';

//commercial deals
export const getCommercialDeals = () => get('/ntr/condcomercial');
export const getCommercialDealsById = (id) => get(`ntr/condcomercial/${id}`); 
export const createCommercialDeal = (dealDef) => post('/ntr/condcomercial/create',dealDef); 
export const editCommercialDeal = (id, data) => put(`/ntr/condcomercial/${id}`, data); 

//lists
export const getFamlies = () => get('/ntr/familia');
export const getSubFamilies = () => get('/ntr/subfamilia');
export const getProducts = () => get('/ntr/producto');
export const getUsersCount = ({ emailComo = '' }) => {
  const queryParams = `${emailComo ? `?emailComo=${emailComo}` : ''}`;
  return get(`/ntr/cliente/count${queryParams}`)
};
export const getUsers = ({ emailComo = '', page = 1 }) => {
  const queryParams = `?offset=${(page - 1) * NUM_CLIENTES_PAG}&limit=${NUM_CLIENTES_PAG}${emailComo ? `&emailComo=${emailComo}` : ''}`;
  return get(`/ntr/cliente${queryParams}`)
};

export const getBrands = () =>get('/ntr/marca');
export const getSubBrands = () => get('/ntr/submarca');
export const getDealTypes = () => get('ntr/def/cctipo');