const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.experiments = {
          ...config.experiments,
          asyncWebAssembly: true,
        };
    
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
