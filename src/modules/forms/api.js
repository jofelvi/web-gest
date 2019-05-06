import { get, post } from '../../lib/restClient';

export const startProcess = key => get(`/procdef/${key}/launch/form`);

export const continueProcess = (key, data) =>
  post(`/procdef/${key}/launch`, data);

export const checkTask = procId => get(`/process/${procId}/next`);

export const getTaskVariables = taskId => get(`/task/${taskId}/vars`);

export const completeTask = (taskId, data) =>
  post(`/task/${taskId}/complete`, data);
