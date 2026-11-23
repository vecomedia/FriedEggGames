import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { existsSync, readFileSync } from 'node:fs';

const certificateUrl = new URL('./certs/localhost.pem', import.meta.url);
const keyUrl = new URL('./certs/localhost-key.pem', import.meta.url);
const hasLocalCertificate = existsSync(certificateUrl) && existsSync(keyUrl);

export default defineConfig(({ command }) => ({
	plugins: [sveltekit({ adapter: adapter() })],
	server: {
		host: 'localhost',
		port: 8001,
		https: command === 'serve' && hasLocalCertificate
			? {
					key: readFileSync(keyUrl),
					cert: readFileSync(certificateUrl)
				}
			: undefined,
		strictPort: true
	}
}));
