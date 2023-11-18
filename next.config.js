/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    },
    redirects: async () => {
        return [
            {
                source: '/store/c',
                destination: '/store',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
