import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import Node from './Node';
import './styles.css';

const LeftMenu = ({
    selectParentItem,
    loadChildItemsMenu,
    parentItem,
    childItemsMenu
}) => {
    useEffect(()=>{
        if(parentItem.id != null){
            loadChildItemsMenu(parentItem);
        }
    },[loadChildItemsMenu,parentItem]);

    return  <div>
                {parentItem.id != null? 
                <aside className="menu-left-container">
                <header className="menu-left-header">
                    <h3 className="menu-left-title">{parentItem.label}</h3>
                    <label className="menu-left-close" onClick={()=>{selectParentItem({})}}>x</label>
                </header>
                <ul className="menu-left-nav-container">
                    {childItemsMenu.map((child,i)=> <Node childItem={child} key={i}/>)}
                </ul>
            </aside>
            : <div></div>}
            </div>

};

LeftMenu.propTypes = {
    selectParentItem: PropTypes.func,
    loadChildItemsMenu: PropTypes.func,
    parentItem: PropTypes.shape({id:0,label:'',url:'',childs:[]}),
    childItemsMenu: PropTypes.arrayOf(PropTypes.object)
};
export default LeftMenu;