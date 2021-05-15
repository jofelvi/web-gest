import { connect } from 'react-redux';
import {
  changeMeasuringUnit,
} from '../../../../modules/charts/actions';

import View from './view';

export default connect(
  state => ({
    measuringUnitSelected: state.charts.measuringUnitSelected,
  }),
  {
    changeMeasuringUnit
  }
)(View);
