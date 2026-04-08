import http from '../request';

export const courseList = () => http.get('/api/course/list');

export const createCourse = (data) => http.post('/api/course/create', data);

export const getCourseDetail = (id) => http.get(`/api/course/${id}`);

export const updateCourse = (data) => http.post('/api/course/update', data);

export const deleteCourse = (id) => http.post(`/api/course/delete/${id}`);
