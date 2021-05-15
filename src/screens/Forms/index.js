import { connect } from 'react-redux';
import View from './view';

export default connect(state => ({
  processStep: state.forms.processStep,
  taskName: state.forms.taskName,
}))(View);
