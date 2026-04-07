import * as qiniu from 'qiniu-js';
import http from '@/api/request.js';

// 七牛云基础URL
export const QINIU_BASE_URL = 'https://zztp.zzxyg88.com/';

/**
 * 获取七牛云上传token
 * @returns {Promise<string>} token值
 */
async function getToken() {
	const url = '/scm-admin/admin/common/pictureUpToken';
	try {
		const res = await http.get(url);
		if (res.code !== 200) {
			return Promise.reject(res.message);
		}
		return res.data;
	} catch (error) {
		console.error('获取七牛云token失败:', error);
		return Promise.reject(error);
	}
}

/**
 * 合并参数对象
 * @param {Object} obj1 - 基础对象
 * @param {Object} obj2 - 要合并的对象
 * @returns {Object} 合并后的对象
 */
function mergeParams(obj1, obj2) {
	const mergeObj = { ...obj1 };

	Object.keys(obj2).forEach((key2) => {
		if (obj2[key2] !== undefined && obj2[key2] !== null) {
			mergeObj[key2] = obj2[key2];
		}
	});

	return mergeObj;
}

/**
 * 生成随机文件名
 * @param {Object|string} source - 文件对象或文件类型
 * @param {string} [ext] - 文件扩展名
 * @returns {string} 生成的文件名
 */
export function generateRandomKey(source, ext = 'jpg') {
	const timestamp = Date.now();
	const randomStr = Math.random().toString(36).substring(2, 10);

	// 如果是文件对象，尝试从文件名中提取扩展名
	if (source && typeof source === 'object' && source.name) {
		ext = source.name.split('.').pop() || ext;
	}

	return `upload/${timestamp}_${randomStr}.${ext}`;
}

/**
 * 将Base64字符串转换为Blob对象
 * @param {string} dataURL - Base64格式的字符串
 * @returns {Blob} 转换后的Blob对象
 * @throws {Error} 当dataURL格式无效时抛出错误
 */
export function dataURLtoBlob(dataURL) {
	// 参数验证
	if (!dataURL || typeof dataURL !== 'string') {
		throw new Error('dataURL参数必须是有效的字符串');
	}

	// 检查dataURL格式是否正确
	const arr = dataURL.split(',');
	if (arr.length < 2) {
		throw new Error('无效的dataURL格式');
	}

	// 安全获取MIME类型
	const mimeMatch = arr[0].match(/:(.*?);/);
	if (!mimeMatch || mimeMatch.length < 2) {
		throw new Error('无法从dataURL中提取MIME类型');
	}

	const mime = mimeMatch[1];

	try {
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new Blob([u8arr], { type: mime });
	} catch (err) {
		throw new Error('解码dataURL失败: ' + err.message);
	}
}

// 默认配置
const defaultConfig = {
	mimeType: 'image/*',
	key: null,
	useCdnDomain: true,
	region: qiniu.region.z2, // 华南区域
	// 压缩配置
	compress: {
		quality: 0.9,
		maxWidth: 1920,
		maxHeight: 1920,
	},
	// 重试配置
	retryCount: 3,
	retryDelay: 1000,
};

/**
 * 上传文件到七牛云
 * @param {File|Blob} file - 要上传的文件或Blob对象
 * @param {Object} config - 上传配置
 * @param {Function} [config.onProgress] - 上传进度回调函数 (progress) => void
 * @returns {Promise<Object>} 上传结果
 */
export function upload(file, config = {}) {
	console.log('上传文件:', file);

	// 验证文件参数
	if (!file || typeof file !== 'object') {
		return Promise.reject(new Error('无效的文件参数'));
	}

	// 合并配置
	const mergeConfig = mergeParams(defaultConfig, config);

	// 如果没有提供key，自动生成一个
	if (!mergeConfig.key) {
		mergeConfig.key = generateRandomKey(file);
	}

	return new Promise((resolve, reject) => {
		let retryCount = 0;

		function doUpload() {
			const progressOption = {
				next(res) {
					console.log('上传进度:', res.total.percent);
					if (mergeConfig.onProgress) {
						mergeConfig.onProgress(res.total.percent);
					}
				},
				error(err) {
					console.error('上传失败:', err);
					// 重试逻辑
					if (retryCount < mergeConfig.retryCount) {
						retryCount++;
						console.log(`第${retryCount}次重试上传...`);
						setTimeout(doUpload, mergeConfig.retryDelay);
					} else {
						reject(err);
					}
				},
				complete(res) {
					console.log('上传完成:', res);
					res.path = QINIU_BASE_URL + res.key;
					resolve(res);
				},
			};
			getToken()
				.then((token) => {
					console.log('获取到token，开始压缩图片');

					// 使用合并后的配置进行压缩
					qiniu
						.compressImage(file, mergeConfig.compress || {})
						.then((data) => {
							console.log('图片压缩完成，开始上传');

							// 上传配置，不包含压缩参数
							const uploadConfig = {
								useCdnDomain: mergeConfig.useCdnDomain,
								region: mergeConfig.region,
								concurrentRequestLimit: 3,
								checkByMD5: true,
							};

							// 执行上传
							const observable = qiniu.upload(
								data.dist, // 压缩后的文件
								mergeConfig.key, // 文件名
								token, // 上传凭证
								uploadConfig, // 上传配置
								{}
							);

							const subscription = observable.subscribe(progressOption);
						})
						.catch((compressError) => {
							console.error('图片压缩失败:', compressError);
							// 如果压缩失败，尝试直接上传原图
							console.log('尝试直接上传原图');

							const uploadConfig = {
								useCdnDomain: mergeConfig.useCdnDomain,
								region: mergeConfig.region,
							};

							const observable = qiniu.upload(
								file, // 原图
								mergeConfig.key,
								token,
								uploadConfig,
								{}
							);

							const subscription = observable.subscribe(progressOption);
						});
				})
				.catch((err) => {
					console.error('获取token失败:', err);
					reject(err);
				});
		}

		// 开始上传
		doUpload();
	});
}

/**
 * 上传Base64字符串到七牛云
 * @param {string} base64String - Base64格式的图片字符串
 * @param {Object} config - 上传配置
 * @param {Function} [config.onProgress] - 上传进度回调函数 (progress) => void
 * @returns {Promise<Object>} 上传结果
 */
export async function uploadBase64(base64String, config = {}) {
	try {
		console.log('上传Base64图片');

		// 将Base64转换为Blob
		const blob = dataURLtoBlob(base64String);

		// 从Base64中提取文件扩展名
		const match = base64String.match(/data:image\/(\w+);base64,/);
		const ext = match && match[1] ? match[1] : 'jpg';

		// 创建File对象以支持文件名
		const file = new File([blob], `image_${Date.now()}.${ext}`, { type: blob.type });

		// 使用普通上传函数上传
		return await upload(file, config);
	} catch (error) {
		console.error('Base64上传失败:', error);
		return Promise.reject(error);
	}
}

/**
 * 批量上传文件到七牛云
 * @param {Array<File|Blob>} files - 文件数组
 * @param {Object} config - 上传配置
 * @param {Function} [config.onBatchProgress] - 批量上传进度回调 (totalProgress, completed, total) => void
 * @returns {Promise<Array<Object>>} 上传结果数组
 */
export async function batchUpload(files, config = {}) {
	if (!Array.isArray(files) || files.length === 0) {
		return Promise.reject(new Error('文件数组不能为空'));
	}

	const results = [];
	const total = files.length;
	let completed = 0;

	const uploadPromises = files.map((file, index) => {
		return upload(file, {
			...config,
			// 为每个文件生成唯一key
			key: config.key ? `${config.key}_${index}` : undefined,
			onProgress: (progress) => {
				if (config.onProgress) {
					config.onProgress(progress, index);
				}
			},
		}).then((result) => {
			completed++;
			const totalProgress = (completed / total).toFixed(2);

			if (config.onBatchProgress) {
				config.onBatchProgress(totalProgress, completed, total);
			}

			return result;
		});
	});

	try {
		const allResults = await Promise.all(uploadPromises);
		return allResults;
	} catch (error) {
		console.error('批量上传失败:', error);
		return Promise.reject(error);
	}
}
