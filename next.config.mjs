/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "video-storage.yuorei.com",
            },
        ],
    },
};

export default nextConfig;
