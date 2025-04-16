/** @type {import('next').NextConfig} */

/** Error: Invalid src prop (https://foshanxiaoyu.github.io/images/magic.png) on `next/image`, hostname "foshanxiaoyu.github.io" is not configured under images in your `next.config.js`
 See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
 添加远程模式 remote patterns  协议 protocol，主机名 hostname
 **/
const nextConfig = { // add Object
    images:{
        remotePatterns: [ //远程模式
            {
                protocol:'https',
                hostname:'foshanxiaoyu.github.io'
            },
        ]
    },
};;
export default nextConfig 
