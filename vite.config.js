import { defineConfig } from 'vite';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default defineConfig({
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server: {
        host: true,
        open: !isCodeSandbox,
    },
    build: {
        rollupOptions: {
            input: {
                main: './src/index.html',
                sub: './src/sub/order.html',
            },
            outDir: '../dist',
            emptyOutDir: true,
            sourcemap: true,
        },
    },
});
