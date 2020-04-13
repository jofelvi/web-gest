import { get, post, put } from '../../lib/restClient';

//commercial deals
export const getCommercialDeals = () => get('/ntr/condcomercial');
export const getCommercialDealsById = (id) => get(`ntr/condcomercial/${id}`); 
export const createCommercialDeal = (dealDef) => post('/ntr/condcomercial/create',dealDef); 
export const editCommercialDeal = (id, data) => put(`/ntr/condcomercial/${id}`, data); 

//lists
export const getFamlies = () => get('/ntr/familia');
export const getSubFamilies = () => get('/ntr/subfamilia');
export const getProducts = () => get('/ntr/producto');
export const getUsers = () => get('/ntr/cliente');
export const getBrands = () =>get('/ntr/marca');
export const getSubBrands = () => get('/ntr/submarca');
export const getDealTypes = () => get('ntr/def/cctipo');