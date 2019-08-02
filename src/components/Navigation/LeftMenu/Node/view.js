import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Node = ({
    childItem,
    history
}) => {
    return <li onClick={()=> redirect(childItem,history)}>
         <label>{childItem.label}</label>
    </li>
};

const redirect = (item,_history) => {
    if(item.url){
        _history.push(item.url);
    }
}

Node.propTypes= {
    childItem: PropTypes.object
}

export default withRouter(Node);