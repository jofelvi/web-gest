import { connect } from 'react-redux';

import View from './view';

export default connect(state => ({ status: state.auth.status }))(View);
