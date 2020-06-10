import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ClientsIndas from '../../components/Clients-Indas';

const ClientsIndasScreen = ({
    token,
    loadClientsIndas, 
    loadEntitiesIndas,
    loadWholesalersIndas
}) => {
    useEffect(() =>{
        loadClientsIndas({page: 1, emailComo: ''});
        loadEntitiesIndas();
        //loadWholesalersIndas();
    },[
        token
    ]);
    return (
        <ClientsIndas></ClientsIndas>
    );

};

ClientsIndasScreen.propTypes = {
    loadClientsIndas: PropTypes.func,
    loadEntitiesIndas: PropTypes.func,
    loadWholesalersIndas: PropTypes.func,
    token: PropTypes.string
}

export default ClientsIndasScreen;