const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isProd ? '/image' : '',  // Sustituye 'nombre-del-repositorio' por el nombre de tu repositorio
    assetPrefix: isProd ? '/image/' : '',
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
};

export default nextConfig;
