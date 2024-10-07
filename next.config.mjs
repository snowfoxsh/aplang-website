/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/book/index.html",
        permanent: true,
      },
      {
        source: '/book/:path((?!.*\\.).*)',
        destination: '/book/:path.html',
        permanent: true,
      },
      
    ]
  }
};

export default nextConfig;