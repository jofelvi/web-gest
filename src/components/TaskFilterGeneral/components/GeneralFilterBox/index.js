import { connect } from 'react-redux';

import View from './view';
import { setGeneralFilter } from '../../../../modules/tasks/actions';

export default connect(
    state => ({
        generalFilterType: state.tasks.generalFilterType,
        generalFilterUser: state.tasks.generalFilterUser,
        taskList: state.tasks.taskList,
        username: state.auth.username
    }),
    {
        setGeneralFilter
    }
)(View);
