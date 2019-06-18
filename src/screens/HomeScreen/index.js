import { connect } from "react-redux";

import View from "./view";

export default connect(
  state => ({
    process: state.forms.process,
    taskName: state.forms.taskName
  }),
  {}
)(View);
