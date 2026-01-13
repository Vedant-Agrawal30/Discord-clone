// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     domains:[
//       "uploadthing.com"
//     ]
//   }
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.utfs.io",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "*.uploadthing.com",
      },
    ],
  },
};

export default nextConfig;
