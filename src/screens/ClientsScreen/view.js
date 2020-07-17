import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ClientsIndas from '../../components/Clients-Indas';

const ClientsIndasScreen = ({
    token,
    loadClientsIndas, 
    loadEntitiesIndas,
    filterValues,
    loadWholesalersIndas,
    getClientsCount
}) => {
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