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
    // useEffect(() =>{
    //     // if(filterValues && (filterValues.emailComo || filterValues.nombreComo || filterValues.codcli_cbim )) {
    //     //     console.log("Clients screen load clientes filtered");
    //     //     loadClientsIndas({page: 1, emailComo: filterValues.emailComo, nombreComo: filterValues.nombreComo, codcli_cbim: filterValues.codcli_cbim });
    //     //     getClientsCount({ 
    //     //         emailComo: filterValues.emailComo, 
    //     //         nombreComo: filterValues.nombreComo, 
    //     //         codcli_cbim: filterValues.codcli_cbim  
    //     //     });
    //     // } else {
    //         loadClientsIndas();
    //     // }
    //     loadEntitiesIndas();
    //     //loadWholesalersIndas();
    // },[
    //     token,
    // ]);
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