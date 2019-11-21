import React from 'react';
import './styles.css'
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
            <Col className="user-container" xxl={{span:3, offset:21}}  xs={{span:16, offset:8}}  xl={{span:4, offset:20}} lg={{span:5, offset:19}} md={{span:6, offset:18}} sm={{span:10, offset:14}}>
                <Row gutter={16}>
                    <Col xxl={{span:7}} lg={{span:8}} md={{span:8}} xs={{span:8}}>
                        <img src={usr} alt="imagen de usuario"/>
                    </Col>
                    <Col xxl={{span:17}} lg={{span:16}} md={{span:16}} xs={{span:16}} className="user-desc-container">
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