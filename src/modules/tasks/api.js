import { get } from '../../lib/restClient';

export const fetchTasks = () => get(`/task`);

export const fetchTasksCount = () => get('/task/count');

export const fetchTasksByUser = user => get(`/task?assignee=${user}`);
