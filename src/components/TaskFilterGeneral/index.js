import { connect } from 'react-redux';

import View from './view';

import { fetchTaskList, setGeneralFilter} from '../../modules/tasks/actions';

export default connect(
    state => ({
        triggerGeneralFilter: state.tasks.triggerGeneralFilter,
        generalFilterType: state.tasks.generalFilterType,
        generalFilterUser: state.tasks.generalFilterUser
    }),
    {
        setGeneralFilter, fetchTaskList
    }
)(View);
