/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{ 
        remotePatterns:[ // API get 图
           { 
            protocol:'https',
            hostname:'*',
           },
           { 
            protocol:'https',
            hostname:'foshanxiaoyu.github.io/images',
           },
        ] 
    }
    
};

export default nextConfig;
