import React, { useEffect } from 'react';
import './styles.css'
import logo from '../../../assets/logo.png';
import usr from '../../../assets/user.svg';
import TopNode from './TopNode';
import PropTypes from 'prop-types';
import { STATUS } from '../../../modules/auth/constants';
import { withRouter } from 'react-router-dom';
import {Button} from 'antd';

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
                <Button onClick={() => {
                    logout();
                    history.push('/login');
                   }}>Logout</Button>
            </div>
        </div>
        :<div className="user-container-blank">
            <Button onClick={() => history.push('/login')}>
                Login
            </Button>
            <Button onClick={() => history.push('/signup')}>
                Sign up
            </Button>
        </div>}
    </header>
};
Menu.propTypes = {
    loadMenuItems: PropTypes.func,
    itemsMenu: PropTypes.arrayOf(PropTypes.object),
    parentItem: PropTypes.object,
    logout: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
}


export default withRouter(Menu);