import { get, put, patch } from '../../lib/restClient';

export const fetchTasks = () => get(`/task`);

export const fetchTask = id => get(`/task/${id}`);

export const fetchTasksCount = () => get('/task/count');

export const fetchTasksByUser = user => get(`/task?assignee=${user}`);

export const fetchTaskForm = id => get(`/task/${id}/form`);

export const fetchTaskAssigneeUser = () => get(`/user`);

export const editTask = (id, data) => patch(`/task/${id}`, data);

export const fetchTaskMessage = (id) => get(`/task/${id}/message`);

export const editTaskMessage = (id, data) => put(`/task/${id}/message`, data);

export const fetchTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/all?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const fetchGroupTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/group?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const fetchUserTaskList = (sortBy, sortOrder = 'asc') =>
  get(`/tasklist/user?sortBy=${sortBy}&sortOrder=${sortOrder}`);
