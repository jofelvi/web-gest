import { connect } from 'react-redux';
import View from './view';

import { 
  loadUsers,
} from '../../../../../modules/commercialDeals/actions'


export default connect(
    state =>
      ({
       
      }),
    
    { loadUsers }
  )(View);