import Link from 'next/link'
 
function Posts({ posts }:any) {
    // 第一种方法
    //   return (
//     <ul>
//       {posts.map((post:any) => (
//         <li key={post.id}>
//           <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
//             {post.title}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   )
// 第二种URL
  return (
    <ul>
      {posts.map((post:any) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
 
export default Posts