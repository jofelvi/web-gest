import React from 'react';
import {
    FilterBox,
    MainTitle,
    SubTitle,
    Overlay,
    CheckBoxContainer,
    Validate,
    Reset
} from './styles';

const GeneralFilterBox = ({
    generalFilterType,
    generalFilterUser,
    setGeneralFilter,
    taskList,
    username
}) => {
    console.log(taskList);
    console.log(username);
    return (
        <span>
            <FilterBox>
                <MainTitle>Opciones de filtro</MainTitle>
                <div>
                    <SubTitle>Tipo de tarea</SubTitle>

                    {/* using form event to define the value chosen */}
                    <form onChange={(event) => {
                        generalFilterType = event.target.value;
                    }}>
                        <CheckBoxContainer>
                            <input 
                            type="radio"
                            name="typeAsign"
                            value="aprove"
                            defaultChecked={generalFilterType === 'aprove' ? true : false}
                            />
                            Aprobar Pedido ({username})
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <input
                            type="radio"
                            name="typeAsign"
                            value="validate"
                            defaultChecked={ generalFilterType === 'validate' ? true : false }
                            />
                            Validar Registro
                        </CheckBoxContainer>
                    </form>

                </div>
                <div>
                    <SubTitle>Usuario asignado</SubTitle>

                    {/* using form event to define the value chosen */}
                    <form onChange={(event) => {
                        generalFilterUser = event.target.value;
                    }}>
                        <CheckBoxContainer>
                            <input
                            type="radio"
                            name="usersAsign"
                            value="user"
                            defaultChecked={ generalFilterUser === 'user' ? true : false }
                            />
                            Asignadas a mi
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <input
                            type="radio"
                            name="usersAsign"
                            value="others"
                            defaultChecked={ generalFilterUser === 'others' ? true : false }
                            />
                            Asignadas a otros
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <input
                            type="radio"
                            name="usersAsign"
                            value="nobody"
                            defaultChecked={ generalFilterUser === 'nobody' ? true : false }
                            />
                            Sin asignar
                        </CheckBoxContainer>
                    </form>

                </div>
                <Reset onClick={() => {
                    generalFilterType = null;
                    generalFilterUser = null;
                    setGeneralFilter({
                        triggerGeneralFilter: false,
                        generalFilterType,
                        generalFilterUser
                    });
                }}>Resetear</Reset>
                <Validate onClick={() => {
                    setGeneralFilter({
                        triggerGeneralFilter: false,
                        generalFilterType,
                        generalFilterUser
                    });
                }}>Aplicar</Validate>
            </FilterBox>
            <Overlay onClick={() => {
                setGeneralFilter({
                    triggerGeneralFilter: false,
                    generalFilterType,
                    generalFilterUser
                })
            }}></Overlay>
        </span>
    )
}

export default GeneralFilterBox;