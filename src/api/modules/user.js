import http from '../request';

export const userList = () => http.get('/api/user/list');

export const updateUserType = (data) => http.post('/api/user/updateType', data);
