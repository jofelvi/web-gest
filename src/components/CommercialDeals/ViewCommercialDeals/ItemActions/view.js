import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon} from 'antd';

const menu = (cmp) => <Menu>
    {cmp.deal.estado === "Borrador" &&(
    <Menu.Item key="1" onClick={() => {
        cmp.setFormKey()
        cmp.setCurrentCommercialDeal(cmp.deal);
        cmp.showEditCommercialDeal(true);
        cmp.setCommercialDealFormStep({currentStep: 0})  
    }}>Editar</Menu.Item>)}
    {(cmp.deal.estado === "Activo" || cmp.deal.estado === "Inactivo") &&(
     <Menu.Item key="2" onClick={() => {
        cmp.setFormKey()
        cmp.setCurrentCommercialDeal(cmp.deal);
        cmp.showEditCommercialDeal(true);
        cmp.setCommercialDealFormStep({currentStep: 0}) 
        cmp.setNewCommercialDeal(false) 
    }}>Ver</Menu.Item>)}
     {(cmp.deal.estado === "Borrador" || cmp.deal.estado === "Inactivo") &&(
     <Menu.Item key="3" onClick={() => {
         console.log("activar")
    
    }}>Activar</Menu.Item>)}
    {cmp.deal.estado === "Activo" && (
     <Menu.Item key="4" onClick={() => {
         console.log("Desactivar")
          
    }}>Desactivar</Menu.Item >)}
</Menu>;

const ItemActions = ({
    setCurrentCommercialDeal,
    showEditCommercialDeal,
    showNewProductCommercialDeal,
    showViewProductsCommercialDeal,
    setCommercialDealFormStep,
    deal,
    setFormKey,
    setNewCommercialDeal,
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
            showViewProductsCommercialDeal: showViewProductsCommercialDeal,
            setCommercialDealFormStep: setCommercialDealFormStep, 
            setFormKey: setFormKey,
            setNewCommercialDeal: setNewCommercialDeal
            })}>
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