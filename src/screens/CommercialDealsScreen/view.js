import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ViewCommercialDeals from '../../components/CommercialDeals/ViewCommercialDeals';
import {Tabs} from 'antd';

const {TabPane} = Tabs;

const CommercialDealsScreen = ({
    loadCommercialDeals,
    list
}) =>{
    useEffect(()=>{
        loadCommercialDeals();
    }, [loadCommercialDeals]);
    return  <ViewCommercialDeals 
                list={list} 
                type="all"
                key="all">
            </ViewCommercialDeals>;
};

CommercialDealsScreen.propTypes = {
    loadCommercialDeals: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CommercialDealsScreen;