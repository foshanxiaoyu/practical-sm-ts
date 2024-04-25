// 'use client'
// import Link from "next/link"
// import Image from "next/image"
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// import {  useEffect, useState } from "react";
// type Props = {}

// const Nav = (props: Props) => {
//     const isUserLoggedIn = true
//     const [providers,setProviders] = useState(null)

//     useEffect(()=>{
//         const setProviders = async ()=>{
//             const response  = await getProviders()
//             setProviders(response)  
//         }
//         setProviders()
//     },[])

//   return (
//     <nav className="flex-between w-full mb-16 pt-3">
//         <Link href="/" className='flex gap-2 flex-center'>
//             <Image src="/assets/images/Logo.svg" width={32} height={32} alt={"logo"} className="object-contain" />
//             <p className="logo_text">Promptopia</p>
//         </Link>
        
//         <button type="button" onClick={()=>signOut} className="Outline_btn">
//             Sign Out
//         </button>

//         <Link href="/profile" className='flex gap-2 flex-center'>
//             <Image src="/assets/images/profile.svg" width={30} height={30} alt={"profile"} className="object-contain" />
//         </Link>

//         {/* Desktop Navigation  */}
//         <div className="sm:flex hidden ">
//             {isUserLoggedIn 
//             ? ( 
//             <div className="flex gap-3 md:gap-5">
//                 <Link href="/create-prompt" className="black_btn">
//                     Create Post
//                 </Link>
//             </div> )
//             :(
//             <>
//             { providers && Object.values(providers).map((provider:any)=>
//             (
//                 <button 
//                 type="button" 
//                 key={provider.name}
//                 onClick={()=>signIn(provider.id)} 
//                 className="black_btn"
//                 >
//                     Sign In
//                 </button>
//             ))}
//             </>)

//             }
//         </div>
//     </nav>
//   )
// }

// export default Nav
'use client'
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {}

const Nav = (props: Props) => {

    // const { data: session } = useSession();


    const isUserLoggedIn = true;
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);

    const [toggleDropdown, setToggleDropdown] = useState(false);


    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        fetchProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src="/assets/images/Logo.svg" width={32} height={32} alt={"logo"} className="object-contain" />
                <p className="logo_text">Promptopia</p>
            </Link>

            <button type="button" onClick={()=>signOut} className="Outline_btn">
                Sign Out
            </button>

            <Link href="/profile" className='flex gap-2 flex-center'>
                <Image src="/assets/images/profile.svg" width={30} height={30} alt={"profile"} className="object-contain" />
            </Link>

            {/* Desktop Navigation  */}
            <div className="sm:flex hidden ">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider: any) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
              
            {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
        // {session?.user ? (
          <div className='flex'>
            <Image
            //   src= { session?.user.image } 
              src= "/assets/images/Logo.svg" 
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

        </nav>
    );
};

export default Nav;
