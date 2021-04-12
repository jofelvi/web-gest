import { get, del, post } from '../../lib/restClient';
import {LIMIT} from '../../constants'

const generatingOffset = (page, offset)=>{
  let queryParams = '';
  const limit = LIMIT;
if(page < 0){
  offset = 0
queryParams = `offset=${offset}&limit=${limit}`
}else if(page === 0){
offset = 0
queryParams = `offset=${offset}&limit=${limit}`
}else{
queryParams = `offset=${offset}&limit=${limit}`
}
return queryParams;
}

export const fetchProducts = async (page) => { 
  let offset;
  offset = page;
  let queryParams = generatingOffset(page, offset)
  return get(`ntr/producto?${queryParams}`);
}