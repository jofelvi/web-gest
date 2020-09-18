import React from 'react';

import { FilterOutlined } from '@ant-design/icons';
import GeneralFilterBox from './components/GeneralFilterBox';
import {
    TriggerFilterButton,
    TextButton,
    BottomSpacedDiv
} from './styles';

const button = { text: 'Filtro' };



const TasksFilterGeneral = ({
    generalFilterType,
    generalFilterUser,
    triggerGeneralFilter,
    setGeneralFilter,
    fetchTaskList,
}) => {
    return (
        <BottomSpacedDiv>
            
            {/* button to trigger the general filter appearance */}
            <TriggerFilterButton className={(generalFilterUser || generalFilterType) ? 'filterSelected' : null} onClick={() => {
                // triggers the filter
                setGeneralFilter({
                    triggerGeneralFilter: !triggerGeneralFilter,
                    generalFilterUser,
                    generalFilterType
                });
            }}>
                <FilterOutlined />
                <TextButton>{button.text}</TextButton>
            </TriggerFilterButton>
            
            {/* Filter box component */}
            {triggerGeneralFilter && (<GeneralFilterBox></GeneralFilterBox>)}

        </BottomSpacedDiv>
    );
};

export default TasksFilterGeneral;
