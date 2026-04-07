import http from '@/request'

export const request = (data) => http.post('/common/request', data)
