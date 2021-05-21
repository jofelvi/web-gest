import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ViewCommercialDeals from '../../components/CommercialDeals/ViewCommercialDeals';


const CommercialDealsScreen = ({
    loadCommercialDeals,
    list,
    token
}) =>{
    useEffect(()=>{
        loadCommercialDeals();
    }, [loadCommercialDeals,token]);
    return  <ViewCommercialDeals 
                list={list} 
                type="all"
                key="all">
            </ViewCommercialDeals>;
};

CommercialDealsScreen.propTypes = {
    loadCommercialDeals: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    token: PropTypes.string
}

export default CommercialDealsScreen;