import { connect } from 'react-redux';
import {
  changeTimePeriod,
} from '../../../../modules/charts/actions';

import View from './view';

export default connect(
  state => ({
    periodTimeSelected: state.charts.periodTimeSelected,
  }),
  {
    changeTimePeriod,
  }
)(View);
