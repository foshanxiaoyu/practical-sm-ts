import Image from 'next/image'
import { footerLinks } from '@constants'
import Link from 'next/link'
type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className='flex flex-col text-black-100 mt-5 border-t border-gray-100'>
            <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
                <div className='flex flex-col justify-start items-start gap-6' >
                    <Image src='/logo.svg' alt='logo' width={118} height={18} />
                    <p className='text-base text-gray-700'>Carhub 2024<br />All rights reserved &copy;</p>
                </div>
            </div>
            <div className='footer__links'>
                {footerLinks.map((ftlink) => (
                    <div className='footer__link' key={ftlink.title}>
                        <h3 className='font-bold'>{ftlink.title}</h3>
                        {ftlink.links.map((item) => (
                            <Link href={item.title} key={item.title} className='text-gray-500' >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center flex-wrap mt-10 
            border-t border-gray-100 sm:px-16 py-10'>
                <p>@2025 CarHub.All Rights Reserved </p>
                <div className='footer__copyrights-link'>
                    <Link href='/' className='text-gray-500'>
                            Privacy Policy
                    </Link>
                    <Link href='/' className='text-gray-500'>
                            Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    )
}