import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon} from 'antd';

const menu = (cmp) => <Menu>
    <Menu.Item key="1" onClick={() => {
        cmp.setCurrentCommercialDeal(cmp.deal);
        cmp.showEditCommercialDeal(true);
    }} disabled={cmp.deal.estado != 'Borrador'}>Editar</Menu.Item>
    <Menu.Item key="2">Ver Productos</Menu.Item>
    <Menu.Item key="3" disabled={cmp.deal.estado != 'Borrador'}>Agregar productos</Menu.Item>
</Menu>;

const ItemActions = ({
    setCurrentCommercialDeal,
    showEditCommercialDeal,
    showNewProductCommercialDeal,
    showViewProductsCommercialDeal,
    deal,
    viewProductsCommercialDealVisible,
    newProductsCommercialDealVisible,
    editCommercialDealVisiblee,
    currentCommercialDeal
}) => {
    return  <Dropdown overlay={() => menu({
            deal:deal,
            setCurrentCommercialDeal:setCurrentCommercialDeal,
            showEditCommercialDeal: showEditCommercialDeal,
            showNewProductCommercialDeal: showNewProductCommercialDeal,
            showViewProductsCommercialDeal: showViewProductsCommercialDeal})}>
                <Button>
                Acciones <Icon type="down" />
                </Button>
            </Dropdown>
};

ItemActions.propTypes = {
    setCurrentCommercialDeal: PropTypes.func,
    showEditCommercialDeal: PropTypes.func,
    showNewProductCommercialDeal: PropTypes.func,
    showViewProductsCommercialDeal: PropTypes.func,
    viewProductsCommercialDealVisible: PropTypes.bool,
    newProductsCommercialDealVisible:PropTypes.bool,
    editCommercialDealVisible:PropTypes.bool,
    currentCommercialDeal: PropTypes.object,
    deal:PropTypes.object
};

export default ItemActions;