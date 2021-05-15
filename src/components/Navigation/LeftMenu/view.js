import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import './styles.css';
import { Menu  } from 'antd';
import { Icon } from '@ant-design/compatible';
import { withRouter } from 'react-router-dom';
import {setSelectedKeys} from "../../../modules/menu/actions";

const { SubMenu } = Menu;

const LeftMenu = ({
    itemsMenu,
    loadMenuItems,
    collapsed,
    history,
    setSelectedKeys,
    selectedKeys,
    setOpenKeys,
    openKeys
}) => {
    useEffect(()=>{
        loadMenuItems();
    },[loadMenuItems,itemsMenu, collapsed, selectedKeys, openKeys])
    return  (
            <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                onSelect={ setSelectedKeys }
                onDeselect={ setSelectedKeys }
                onOpenChange={ setOpenKeys }
                selectedKeys={ selectedKeys }
                openKeys={ openKeys }
                >
                {itemsMenu.map(item =>
                {
                    if(item.children) {
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
                        return  <Menu.Item key={item.id} onClick={()=>redirect(item,history)}>
                                    <Icon type="link" />
                                    <span>{item.label}</span>
                                </Menu.Item>;
                    }
                }
                )}
            </Menu>)
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
