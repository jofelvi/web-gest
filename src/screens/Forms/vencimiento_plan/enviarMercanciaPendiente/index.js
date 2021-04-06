import { connect } from 'react-redux';
import {
  getTaskVariables,
  completeTask,
} from '../../../../modules/forms/actions';
import { fetchTask } from '../../../../modules/tasks/actions';
import { loadEntitiesIndas, loadWholesalersIndas } from '../../../../modules/clients-indas/actions';

import View from './view';

export default connect(
  state => ({
    completed: state.forms.completed,
    taskVariables: state.forms.taskVariables,
    task: state.tasks.task,
		entitiesIndas: state.clientsIndas.entitiesIndas,
		wholesalersIndas: state.clientsIndas.wholesalersIndas,
		token: state.auth.token
  }),
  { getTaskVariables, completeTask, fetchTask, loadEntitiesIndas, loadWholesalersIndas }
)(View);
