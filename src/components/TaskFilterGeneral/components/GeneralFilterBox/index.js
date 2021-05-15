import { connect } from 'react-redux';

import View from './view';
import { setGeneralFilter, fetchTaskList } from '../../../../modules/tasks/actions';

const setGeneralFilterAndFetch = ( filters ) => {
    setGeneralFilter( filters );
    return fetchTaskList( {} );
};

export default connect(
    state => ({
        generalFilterType: state.tasks.generalFilterType,
        generalFilterUser: state.tasks.generalFilterUser,
        filterCounts: state.tasks.filterCounts,
        taskList: state.tasks.taskList,
        username: state.auth.username
    }),
    {
        fetchTaskList,
        setGeneralFilter
    }
)(View);
