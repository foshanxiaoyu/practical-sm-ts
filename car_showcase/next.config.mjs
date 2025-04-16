import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{ 
        remotePatterns:[ // API get 图
           { 
            protocol:'https',
            hostname:'cdn.imagin.studio',
           },
           { 
            protocol:'https',
            hostname:'foshanxiaoyu.github.io/images',
           },
        ] 
    }
};

export default nextConfig;
