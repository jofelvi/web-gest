import {connect} from 'react-redux';
import View from './view';

import {loadChildItemsMenu, selectParentItem} from '../../../modules/menu/actions';

export default connect(
state => ({
    parentItem: state.menu.parentItem,
    childItemsMenu: state.menu.childItemsMenu
    }),
    { loadChildItemsMenu, selectParentItem }
)(View);