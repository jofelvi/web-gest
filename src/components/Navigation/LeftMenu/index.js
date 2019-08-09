import {connect} from 'react-redux';
import View from './view';

import {
    loadChildItemsMenu,
    selectParentItem,
    loadMenuItems,
    setCollapse} from '../../../modules/menu/actions';

export default connect(
state => ({
    itemsMenu: state.menu.itemsMenu,
    collapsed: state.menu.collapsed,
    wMenu: state.menu.wMenu
    }),
    { 
        loadChildItemsMenu, 
        selectParentItem,
        loadMenuItems,
        setCollapse }
)(View);