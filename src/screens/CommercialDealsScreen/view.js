import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ViewCommercialDeals from '../../components/ViewCommercialDeals';
import {Tabs} from 'antd';

const {TabPane} = Tabs;

const CommercialDealsScreen = ({
    loadCommercialDeals,
    list
}) =>{
    useEffect(()=>{
        loadCommercialDeals();
    });
    return  <Tabs defaultActiveKey="1">
                <TabPane tab="Promociones" key="1">
                    <ViewCommercialDeals list={list} key="Promociones"></ViewCommercialDeals>
                </TabPane>
                <TabPane tab="Acuerdos Comerciales" key="2">
                    <ViewCommercialDeals list={list} key="Acuerdos"></ViewCommercialDeals>
                </TabPane>
                    <TabPane tab="Planes de Compra" key="3">
                <ViewCommercialDeals list={list} key="Planes"></ViewCommercialDeals>
                </TabPane>
                <TabPane tab="Campañas" key="4">
                    <ViewCommercialDeals list={list} key="Campanias"></ViewCommercialDeals>
                </TabPane>
            </Tabs>;
};

CommercialDealsScreen.propTypes = {
    loadCommercialDeals: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default CommercialDealsScreen;