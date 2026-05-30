// https://vite.dev/config/
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return defineConfig({
    css: { modules: { localsConvention: 'camelCase' } },
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          secure: false,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              const cookies = proxyRes.headers['set-cookie'];
              if (cookies) {
                proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
                  cookie
                    .replace(/; *Secure/gi, '')
                    .replace(/; *SameSite=None/gi, '')
                    .replace(/; *Domain=[^;]+/gi, '')
                );
              }
            });
          },
        },
      },
    },
  });
};
