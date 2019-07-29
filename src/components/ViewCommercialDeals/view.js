import React from 'react';
import PropTypes from 'prop-types';

const ViewCommercialDeals = ({
    list
}) =>{
    return <div>
        {list.map((item,i) => {
        return <div key={i}>{item.id}</div>
    })}
    </div>
};

ViewCommercialDeals.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default ViewCommercialDeals;