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
  },
  async headers() {
   return [
     {
       source: "/playground(.*)", // Apply to all routes
       headers: [
         {
           key: "Cross-Origin-Embedder-Policy",
           value: "require-corp",
         },
         {
           key: "Cross-Origin-Opener-Policy",
           value: "same-origin",
         },
       ],
     },
   ]
  }
};

export default nextConfig;