import { get, post } from '../../lib/restClient';

//commercial deals
export const getCommercialDeals = () => get('/ntr/condcomercial')
export const createCommercialDeal = (dealDef) => post('/ntr/condcomercial/create',dealDef); 

//lists
export const getFamlies = () => get('/ntr/familia');
export const getSubFamilies = () => get('/ntr/subfamilia');
export const getProducts = () => get('/ntr/producto');
export const getUsers = () => get('/ntr/usuario');