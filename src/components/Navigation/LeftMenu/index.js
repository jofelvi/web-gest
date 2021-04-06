import {connect} from 'react-redux';
import View from './view';

import {
    loadChildItemsMenu,
    selectParentItem,
    loadMenuItems,
    setSelectedKeys,
    setOpenKeys,
    setCollapse} from '../../../modules/menu/actions';

export default connect(
state => ({
    itemsMenu: state.menu.itemsMenu,
    collapsed: state.menu.collapsed,
    selectedKeys: state.menu.selectedKeys,
    openKeys: state.menu.openKeys,
    wMenu: state.menu.wMenu
    }),
    {
        loadChildItemsMenu,
        selectParentItem,
        loadMenuItems,
        setCollapse,
        setSelectedKeys,
        setOpenKeys,
    }
)(View);
