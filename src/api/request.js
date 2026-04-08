import axios from 'axios';

const request = axios.create({
	// baseURL: import.meta.env.VITE_APP_API_URL,
	timeout: 5000,
});

// 判断是否是“空值”
function isEmpty(val) {
	return val === null || val === undefined || val === '' || (Array.isArray(val) && val.length === 0);
}

// 深度清理
function cleanObject(obj) {
	if (Array.isArray(obj)) {
		return obj.map((item) => (typeof item === 'object' ? cleanObject(item) : item)).filter((item) => !isEmpty(item));
	}

	if (Object.prototype.toString.call(obj) === '[object Object]') {
		const newObj = {};

		Object.keys(obj).forEach((key) => {
			const value = obj[key];

			if (typeof value === 'object') {
				const cleaned = cleanObject(value);
				if (!isEmpty(cleaned)) {
					newObj[key] = cleaned;
				}
			} else if (!isEmpty(value)) {
				newObj[key] = value;
			}
		});

		return newObj;
	}

	return obj;
}

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		if (config.data) {
			config.data = cleanObject(config.data);
		}

		if (config.params) {
			config.params = cleanObject(config.params);
		}

		// 添加token到请求头
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['token'] = token;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

request.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error)
);

export default request;
