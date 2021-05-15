import { get, post, put, del } from '../../lib/restClient';

export const fetchUsers = () => get('https://randomuser.me/api/?results=100');
export const fetchUserById = id => get(`/users/${id}`);
export const createUser = data => post('/users', data);
export const updateUser = (id, data) => put(`/users/${id}`, data);
export const deleteUser = id => del(`/users/${id}`);
