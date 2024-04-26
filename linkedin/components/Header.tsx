import Image from 'next/image'
import {Briefcase, HomeIcon, MessagesSquare, SearchIcon, UserIcon} from 'lucide-react'
import Link from 'next/link'
type Props = {}

export default function Header({}: Props) {
  return (
    <div className="flex items-center p-2 max-w-5xl mx-auto">
      {/* 左logo图 */}
      <Image
       className='rounded-lg'
       src='https://foshanxiaoyu.github.io/images/linkedin.png'
       width={40}
       height={40}
       alt='linkIcon'
       />
      {/* 中 Search图和输入框 */}
      <div className='flex-1'>
        <form action="" className='flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-94'>
          {/* npm i lucide-react */}
          <SearchIcon className='h-4 text-gray-600'/> 
          <input type="text" placeholder='Search ' className='bg-transparent flex-1 outline-none' />
        </form>
      </div>
      {/* 右 */}
      <div className='flex items-center space-x-4 px-4 '>
        <Link href='/' className='icon flex-warp'>
          <HomeIcon className='h-5' />
          <p className='flex items-center' >Home</p>
        </Link>
        <Link href='/network' className='icon hidden  md:flex' >
          <UserIcon className='h-5' />
          <p className='' >Network</p>
        </Link>
        <Link href='/jobs' className='icon  hidden md:flex'>
          <Briefcase className=' h-5' />
          <p className='flex' >Jobs</p>
        </Link>
        <Link href='/message' className='icon hidden md:flex'>
          <MessagesSquare className=' h-5' />
          <p className='flex' >Messaging</p>
        </Link>

        {/* User Button if signed in */}


        {/* Sign In Button if not signed in */}

      </div>


    </div>
  )
}