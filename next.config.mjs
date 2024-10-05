/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Configuración para WebAssembly
        config.experiments = {
          ...config.experiments,
          asyncWebAssembly: true,
        };
    
        // Evitar que Next.js intente procesar módulos específicos en el servidor
        if (isServer) {
          config.externals.push({
            '@xenova/transformers': 'commonjs @xenova/transformers',
            'onnxruntime-node': 'commonjs onnxruntime-node',
          });
        }
    
        return config;
    },
    basePath: '/image',
    assetPrefix: '/image/',
};

export default nextConfig;
