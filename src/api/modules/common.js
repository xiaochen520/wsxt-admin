import http from '../request';

export const regist = (data) => http.post('/api/user/register', data);

export const login = (data) => http.post('/api/user/login', data);

export const getCurrentUser = () => http.get('/api/user/current');
