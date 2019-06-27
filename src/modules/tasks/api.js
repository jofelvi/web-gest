import { get } from '../../lib/restClient';

export const fetchTasks = () => get(`/task`);

export const fetchTasksCount = () => get('/task/count');

export const fetchTasksByUser = user => get(`/task?assignee=${user}`);

export const fetchTaskList = () => get('/tasklist/all');

export const fetchGroupTaskList = () => get('/tasklist/group');

export const fetchUserTaskList = () => get('/tasklist/user');
