import http from '../request';

export const getPaymentConfig = () => http.get('/api/payment/config');

export const updatePaymentConfig = (data) => http.post('/api/payment/config', data);
