import { connect } from 'react-redux';

import { continueProcess } from '../../../../modules/forms/actions';

import View from './view';

export default connect(
  state => ({
    key: state.forms.processKey
  }),
  { continueProcess }
)(View);
