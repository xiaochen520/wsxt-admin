import http from '../request';

export const orderList = (params) => http.get('/api/order/list', { params });

export const auditOrder = (data) => http.post('/api/order/audit', data);
