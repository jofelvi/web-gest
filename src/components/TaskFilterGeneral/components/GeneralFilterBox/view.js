import React, {useState} from 'react';
import {
    FilterBox,
    MainTitle,
    SubTitle,
    Overlay,
    CheckBoxContainer,
    Validate,
    Reset
} from './styles';
import _ from 'underscore';

const setGeneralFilterAndFetch = ( setGeneralFilter, fetchTaskList, filters ) => {
    setGeneralFilter( filters );
    return fetchTaskList( {} );
};

const GeneralFilterBox = ({
    generalFilterType,
    generalFilterUser,
    fetchTaskList,
    setGeneralFilter,
    taskList,
    username,
    filterCounts
}) => {
    const [userFilters, setUserFilters] = useState(generalFilterUser != undefined ? generalFilterUser : []);
    const [typeFilters, setTypeFilters] = useState(generalFilterType != undefined ? generalFilterType : []);
    return (
        <span>
            <FilterBox>
                <MainTitle>Opciones de filtro</MainTitle>
                <div>
                    <SubTitle>Tipo de tarea</SubTitle>

                    {/* using form event to define the value chosen */}
                        <form onChange={(event) => {
                            if (generalFilterType && _.indexOf(generalFilterType, event.target.value) > -1 ) {
                                generalFilterType = _.difference(generalFilterType, [event.target.value])
                            } else {
                                if (!generalFilterType) {
                                    generalFilterType = []
                                }
                                generalFilterType.push(event.target.value)
                            }
                        }}>
                        <CheckBoxContainer>
                            <input 
                            type="checkbox"
                            name="typeAsign"
                            value="Tramitar Pedido"
                            defaultChecked={ _.indexOf( typeFilters, 'Tramitar Pedido') > -1 }
                            />
                            Aprobar Pedido ({filterCounts.type_order ? filterCounts.type_order : '-'})
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <input
                            type="checkbox"
                            name="typeAsign"
                            value="Registrar Cliente"
                            defaultChecked={ _.indexOf( typeFilters, 'Registrar Cliente') > -1 }
                            />
                            Validar Registro ({filterCounts.type_approval ? filterCounts.type_approval : '-'})
                        </CheckBoxContainer>
                    </form>

                </div>
                <div>
                    <SubTitle>Usuario asignado</SubTitle>

                    {/* using form event to define the value chosen */}
                    <form onChange={(event) => {
                        if (generalFilterUser && _.indexOf(generalFilterUser, event.target.value) > -1 ) {
                            generalFilterUser = _.difference(generalFilterUser, [event.target.value])
                        } else {
                            if (generalFilterUser === undefined) {
                                generalFilterUser = []
                            }
                            generalFilterUser.push(event.target.value)
                        }
                    }}>
                        <CheckBoxContainer>
                            <input
                            type="checkbox"
                            name="usersAsign"
                            value="user"
                            defaultChecked={ _.indexOf( userFilters, 'user') > -1 }
                            />
                            Asignadas a mi ({filterCounts.user_me ? filterCounts.user_me : '-'})
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <input
                            type="checkbox"
                            name="usersAsign"
                            value="others"
                            defaultChecked={ _.indexOf( userFilters, 'others') > -1}
                            />
                            Asignadas a otros ({filterCounts.user_others ? filterCounts.user_others : '-'})
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <input
                            type="checkbox"
                            name="usersAsign"
                            value="nobody"
                            defaultChecked={ _.indexOf( userFilters, 'nobody') > -1 }
                            />
                            Sin asignar ({filterCounts.user_nobody ? filterCounts.user_nobody : '-'})
                        </CheckBoxContainer>
                    </form>

                </div>
                <Reset onClick={() => {
                    generalFilterType = null;
                    generalFilterUser = [];
                    setGeneralFilterAndFetch( setGeneralFilter, fetchTaskList, {
                        triggerGeneralFilter: false,
                        generalFilterType,
                        generalFilterUser
                    });
                }}>Resetear</Reset>
                <Validate onClick={() => {
                    setUserFilters(generalFilterUser);
                    setTypeFilters(generalFilterType);
                    setGeneralFilterAndFetch( setGeneralFilter, fetchTaskList, {
                        triggerGeneralFilter: false,
                        generalFilterType,
                        generalFilterUser
                    });
                }}>Aplicar</Validate>
            </FilterBox>
            <Overlay onClick={() => {
                setGeneralFilterAndFetch( setGeneralFilter, fetchTaskList, {
                    triggerGeneralFilter: false,
                    generalFilterType,
                    generalFilterUser
                })
            }}></Overlay>
        </span>
    )
}

export default GeneralFilterBox;