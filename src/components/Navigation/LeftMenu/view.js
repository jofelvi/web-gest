import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import './styles.css';
import { Col, Row, Menu, Icon, Button} from 'antd';
import { withRouter } from 'react-router-dom';

const { SubMenu } = Menu;

const LeftMenu = ({
    itemsMenu,
    loadMenuItems,
    collapsed,
    setCollapse,
    wMenu,
    history,
}) => {
    useEffect(()=>{
        loadMenuItems();
    },[loadMenuItems,itemsMenu, collapsed])
    return  <Col md={{span:wMenu}} className="menu-container">
                <Row>
                    <a className="menu-toggle">
                        <Icon type={collapsed ? 'double-right' : 'double-left'}
                            onClick={()=>{
                                setCollapse(!collapsed);
                            }} />
                    </a>
                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        >
                        {itemsMenu.map(item => 
                        {
                            if(item.children){
                                return  <SubMenu
                                            key={item.id}
                                            title={
                                                <span>
                                                <Icon type="appstore" />
                                                <span>{item.label}</span>
                                                </span>
                                            }
                                            >
                                            {item.children.map(child=>
                                                <Menu.Item key={child.id} onClick={()=>redirect(child,history)}>
                                                    <Icon type="link" />
                                                    <span>{child.label}</span>
                                                </Menu.Item>
                                            )}
                                        </SubMenu>;
                            } else {
                                return  <Menu.Item key={item.id}>
                                            <Icon type="link" />
                                            <span>{item.label}</span>
                                        </Menu.Item>;
                            }
                        }
                        )}
                    </Menu>
                </Row>
            </Col>
};

const redirect = (item,_history) => {
    if(item.url){
        _history.push(item.url);
    }
}

LeftMenu.propTypes = {
    loadMenuItems: PropTypes.func,
    itemsMenu: PropTypes.arrayOf(PropTypes.object),
    toggleCollapsed: PropTypes.bool,
    wMenu: PropTypes.number,
    setCollapse: PropTypes.func
};
export default withRouter(LeftMenu);