import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		vueJsx(),
		vueDevTools(),
		AutoImport({
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					prefix: 'Icon',
				}),
			],
		}),
		Components({
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					enabledCollections: ['ep'],
				}),
			],
		}),
		Icons({
			autoInstall: true,
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://192.168.30.154:9001',
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: 'dist',
	},
});
