import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const TopNode = ({
    parentItem,
    selectParentItem,
    id,
    label,
    url,
    history
}) => {
    return <li>
         <label onClick={()=> redirect({id:id,label:label,url:url},history,selectParentItem)}>{label}</label>
    </li>
};

const redirect = (item,_history, _selectNode) => {
    if(item.url){
        _history.push(item.url);
    } else {
        _selectNode(item);
    }
}

TopNode.propTypes= {
    parentItem: PropTypes.shape({id:0,label:'',url:'',childs:[]}),
    selectParentItem: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string
}

export default withRouter(TopNode);