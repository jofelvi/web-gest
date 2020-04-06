import { get, put, patch } from '../../lib/restClient';

export const fetchTasks = () => get(`/task`);

export const fetchTask = id => get(`/task/${id}`);

export const fetchTasksCount = () => get('/task/count');

export const fetchTasksByUser = user => get(`/task?assignee=${user}`);

export const fetchTaskForm = id => get(`/task/${id}/form`);

export const editTask = id => patch(`/task/${id}`);

export const fetchTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/all?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const fetchGroupTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/group?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const fetchUserTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/user?sortBy=${sortBy}&sortOrder=${sortOrder}`);
