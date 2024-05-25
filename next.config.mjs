/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: ['pexels.com', 'i.ibb.co'] // Add your image domain(s) here
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

};

export default nextConfig;
