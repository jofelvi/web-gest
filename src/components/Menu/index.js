import View from './view';
import { connect } from 'react-redux';

import { logout } from '../../modules/auth/actions';
import { loadMenuItems } from '../../modules/menu/actions'

export default connect(
    state => ({
      status: state.auth.status,
      itemsMenu: state.menu.itemsMenu,
      parentItem: state.menu.parentItem
    }),
    { logout, loadMenuItems }
  )(View);