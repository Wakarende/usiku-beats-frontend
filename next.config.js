/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "",
  // trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      "kayfoplay-images-bucket.s3.eu-central-1.amazonaws.com",
      "strapi-test-1-staging.eu-central-1.elasticbeanstalk.com",
      "https://country-code-au6g.vercel.app",
      "api.usiku.games",
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/mobilemoney/v1/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, lang",
          },
        ],
      },
    ];
  },
  // async redirects() {
  //     return [
  //       {
  //         source: '/',
  //         destination: '/hub', // Change '/new-homepage' to your desired path
  //         permanent: true,
  //       },
  //     ]
  //   },
};

module.exports = nextConfig;
// module.exports = {
//   async rewrites() {
//     return [
//       // Rewrite everything else to use `pages/index`
//       {
//         source: '/:path*',
//         destination: '/',
//       },
//     ];
//   },
// };
