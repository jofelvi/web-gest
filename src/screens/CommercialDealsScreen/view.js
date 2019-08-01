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
    }, [loadCommercialDeals]);
    return  <Tabs defaultActiveKey="0" tabPosition="left">
                <TabPane 
                    tab="Promociones" 
                    key="0">
                    <ViewCommercialDeals 
                        list={list}
                        type="Offers" 
                        key="Promociones"></ViewCommercialDeals>
                </TabPane>
                <TabPane 
                    tab="Acuerdos Comerciales" 
                    key="1">
                    <ViewCommercialDeals 
                        list={list} 
                        type="Agreements"
                        key="Acuerdos"></ViewCommercialDeals>
                </TabPane>
                <TabPane 
                    tab="Planes de Compra" 
                    key="2">
                    <ViewCommercialDeals 
                        list={list} 
                        type="Plans" 
                        key="Planes"></ViewCommercialDeals>
                </TabPane>
                <TabPane 
                    tab="Campañas" 
                    key="3">
                    <ViewCommercialDeals 
                        list={list} 
                        type="Campaigns"
                        key="Campanias"></ViewCommercialDeals>
                </TabPane>
            </Tabs>;
};

CommercialDealsScreen.propTypes = {
    loadCommercialDeals: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CommercialDealsScreen;