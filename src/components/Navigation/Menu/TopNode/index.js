import { connect } from "react-redux";
import View from "./view";
import { selectParentItem } from '../../../../modules/menu/actions';

export default connect(
state => ({
    parentItem: state.menu.parentItem
    }),
    { selectParentItem }
)(View);