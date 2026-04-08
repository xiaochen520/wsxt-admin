import http from '../request';

export const orderList = (params) => http.get('/api/order/list', { params });
