import React from 'react';
import Image from 'next/image';
import DevWorkLogo from '../public/devwork-logo.png';
import DevWorkMiniLogo from '../public/devwork-minilogo.png';
import { SearchIcon, PlusCircleIcon, HomeIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  console.log(session);


  const signInHandler = () => {
    signIn()
  }

  const signOutHandler = () => {
    signOut()
  }

  return (
    <div className="shadow-sm border-b sticky top-0 py-2 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* left */}

        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
          
            src={DevWorkLogo}
            alt="logo"
            layout="fill"
            className="object-contain"
          />
        </div>

        <div className="cursor-pointer h-10 w-10 relative lg:hidden">
          <Image
            src={DevWorkMiniLogo}
            alt="logo"
            layout="fill"
            className="object-contain"
          />
        </div>

        {/* center */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-3">
            <SearchIcon className="w-5 text-rose-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {/* right */}
        <div className="flex items-center space-x-4">
          <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {session ? (
            <>
              <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
              <div className="w-6 h-6 ring-yellow-400 ring rounded-full cursor-pointer relative overflow-hidden ring-offset-2">
              <Image
              onClick={signOutHandler}
                className=""
                alt="user-image"
                src={session.user?.image || ''}
                layout="fill"
                objectFit='cover'
              />
              </div>
            </>
          ) : <button onClick={signInHandler}>Sign in</button>}
        </div>
      </div>
    </div>
  );
}
