/** @type {import('next').NextConfig} */
const nextConfig = {
        typescript: {
                        ignoreBuildErrors: true,
        },
        eslint: {
                        ignoreDuringBuilds: true,
        },
        experimental: {
                        serverComponentsExternalPackages: ['@prisma/client', 'prisma', '@react-pdf/renderer', 'puppeteer-core', '@sparticuz/chromium'],
        },
        webpack: (config, { isServer }) => {
                        if (isServer) {
                                                const existing = Array.isArray(config.externals)
                                                        ? config.externals
                                                                                : config.externals
                                                        ? [config.externals]
                                                                                : []
                                                                        config.externals = [
                                                                                                        ...existing,
                                                                                                        'puppeteer-core',
                                                                                                        '@sparticuz/chromium',
                                                                                                        '@react-pdf/renderer',
                                                                                                ]
                        }
                        return config
        },
        images: {
                        remotePatterns: [
                            {
                                                            protocol: 'https',
                                                            hostname: '*.supabase.co',
                                                            pathname: '/storage/v1/object/public/**',
                            },
                                        ],
        },
        async redirects() {
                        return [
                            { source: '/amor', destination: '/amor.html', permanent: false },
                            { source: '/empresas', destination: '/empresas.html', permanent: false },
                                        ]
        },
}
module.exports = nextConfig
