import React, { useEffect } from 'react';
import './styles.css'
import logo from '../../assets/logo.png';
import usr from '../../assets/user.svg';
import TopNode from './TopNode';
import PropTypes from 'prop-types';
import { STATUS } from '../../modules/auth/constants';
import { withRouter } from 'react-router-dom'

const Menu = ({
    loadMenuItems,
    itemsMenu,
    parentItem,
    logout, 
    status,
    history
}) => {
    useEffect(()=>{
        loadMenuItems();
    },[loadMenuItems])
    return <header className="menu-container">
        <div className="logo-container">
            <img src={logo} alt="logo sitio domtar indas"/>
        </div>
        {status === STATUS.LOGGED ? 
        <ul className="nav-container">
            {itemsMenu.map((item,i) => <TopNode id={item.id} label={item.label} url={item.url} key={i}/>)}
        </ul>
        :<div className="nav-container-blank"></div>}
        {status === STATUS.LOGGED ? 
        <div className="user-container">
            <img src={usr} alt="imagen de usuario"/>
            <div className="user-desc-container">
                <label>Rafael Lucia</label>
                <label>Gerencia General</label>
                <a onClick={() => {
                    logout();
                    history.push('/login');
                   }}>Logout</a>
            </div>
        </div>
        :<div className="user-container-blank">
            <a onClick={() => history.push('/login')}>
                Login
            </a>
            <a onClick={() => history.push('/signup')}>
                Sign up
            </a>
        </div>}
    </header>
};
Menu.propTypes = {
    loadMenuItems: PropTypes.func,
    itemsMenu: PropTypes.arrayOf(PropTypes.object),
    parentItem: PropTypes.shape({id:0,label:'',url:'',childs:[]}),
    logout: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
}


export default withRouter(Menu);