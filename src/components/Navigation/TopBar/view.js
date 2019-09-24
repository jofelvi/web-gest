import React from 'react';
import './styles.css'
import logo from '../../../assets/logo.png';
import usr from '../../../assets/user.svg';
import PropTypes from 'prop-types';
import { STATUS } from '../../../modules/auth/constants';
import { withRouter } from 'react-router-dom';
import {Button, Row, Col} from 'antd';

const TopBar = ({
    logout, 
    status,
    history
}) => {
    return <Row className="topbar">
            {/*<div className="logo-container">
                <img src={logo} alt="logo sitio domtar indas"/>
    </div>*/}
            {status === STATUS.LOGGED ? 
            <Col className="user-container" xs={{span:8, offset:16}} md={{span:6, offset:18}} sm={{span:6, offset:18}}>
                <Row gutter={16}>
                    <Col md={{span:5}} xs={{span:8}}>
                        <img src={usr} alt="imagen de usuario"/>
                    </Col>
                    <Col md={{span:19}} className="user-desc-container">
                        <Col>Rafael Lucia</Col>
                        <Button onClick={() => {
                            logout();
                            history.push('/login');
                        }}>Logout</Button>
                    </Col>
                </Row>
            </Col>
            :<Col md={{span:3, offset:21}} className="user-container">
                <Button onClick={() => history.push('/login')}>
                    Login
                </Button>
                <Button onClick={() => history.push('/signup')}>
                    Sign up
                </Button>
            </Col>}
        </Row>
};
TopBar.propTypes = {
    logout: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
}


export default withRouter(TopBar);