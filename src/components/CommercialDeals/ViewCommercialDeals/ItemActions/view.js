import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon} from 'antd';
import {validationCommercialDeal} from './utils'

const menu = (cmp) => <Menu>
    {cmp.deal.estado === "Borrador" &&(
    <Menu.Item key="1" onClick={() => {
        cmp.setFormKey()
        cmp.loadUsers({page: 1, emailComo: ''});
        cmp.setCurrentCommercialDeal(cmp.deal);
        cmp.showEditCommercialDeal(true);
        cmp.setCommercialDealFormStep({currentStep: 0})  
    }}>Editar</Menu.Item>)}
    {(cmp.deal.estado === "Activo" || cmp.deal.estado === "Inactivo") &&(
     <Menu.Item key="2" onClick={() => {
        cmp.setFormKey()
        cmp.loadUsers({page: 1, emailComo: ''});
        cmp.setCurrentCommercialDeal(cmp.deal);
        cmp.showEditCommercialDeal(true);
        cmp.setCommercialDealFormStep({currentStep: 0}) 
        cmp.setNewCommercialDeal(false) 
    }}>Ver</Menu.Item>)}
     {(cmp.deal.estado === "Borrador" || cmp.deal.estado === "Inactivo") &&(
     <Menu.Item key="3" onClick={() => {
         validationCommercialDeal(cmp.deal, cmp.editCommercialDeal)
    
    }}>Activar</Menu.Item>)}
    {cmp.deal.estado === "Activo" && (
     <Menu.Item key="4" onClick={() => {
         cmp.editCommercialDeal({id: cmp.deal.idcondcomercial, values:{ idestado: 2, productos: cmp.deal.productos, escalados: cmp.deal.escalados, clientes: cmp.deal.clientes }})
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
    loadUsers,
    setNewCommercialDeal,
    editCommercialDeal,
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
            loadUsers: loadUsers,
            setNewCommercialDeal: setNewCommercialDeal,
            editCommercialDeal:editCommercialDeal
            
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