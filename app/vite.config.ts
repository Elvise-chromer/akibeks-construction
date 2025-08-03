import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@views': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'build',
    sourcemap: false, // Disable in production for security
    minify: 'esbuild',
    target: 'esnext',
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Aggressive code splitting for better caching
        manualChunks: {
          // Core libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          
          // UI libraries
          icons: ['react-icons'],
          motion: ['framer-motion'],
          
          // Form handling
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          
          // Utilities
          utils: ['date-fns', 'clsx'],
          
          // Toast notifications
          toast: ['react-hot-toast'],
          
          // Admin components (lazy loaded)
          admin: [
            './src/admin/auth/AdminLogin.tsx',
            './src/admin/dashboard/AdminDashboard.tsx'
          ]
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      // External dependencies that shouldn't be bundled
      external: [],
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Increase memory for large builds
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hook-form',
      'react-hot-toast',
      'react-icons/hi',
      'react-icons/fa',
      'date-fns',
      'yup',
      'framer-motion',
      'clsx'
    ],
    // Pre-bundle development dependencies
    force: false,
  },
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    // Environment variables for runtime
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  preview: {
    port: 3000,
    host: true,
    // Enable HTTPS in preview if certificates are available

  },
  // CSS optimization
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Add any CSS preprocessor options here
    },
  },
  // Performance optimizations
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  // Worker optimization
  worker: {
    format: 'es',
  },
})