import { get } from '../../lib/restClient';

export const fetchTasks = () => get(`/task`);

export const fetchTasksCount = () => get('/task/count');

export const fetchTasksByUser = user => get(`/task?assignee=${user}`);

export const fetchTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/all?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const fetchGroupTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/group?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const fetchUserTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/user?sortBy=${sortBy}&sortOrder=${sortOrder}`);
