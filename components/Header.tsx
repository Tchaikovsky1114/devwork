import React from 'react'
import Image from 'next/image'
import DevWorkLogo from '../public/devwork-logo.png'
import DevWorkMiniLogo from '../public/devwork-minilogo.png'
import { SearchIcon } from '@heroicons/react/solid'


export default function Header() {
  return (
    <div className='flex items-center justify-between max-w-6xl'>
      {/* left */}
    
    <div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid'>
      <Image src={DevWorkLogo} alt="logo" layout='fill' className='object-contain' />
    </div>
    
    
    <div className='cursor-pointer h-10 w-10 relative lg:hidden'>
      <Image src={DevWorkMiniLogo} alt="logo" layout='fill' className='object-contain' />
    </div>
    
      {/* center */}
      <div className='relative mt-1'>
        <div className='absolute top-2 left-3'>
        <SearchIcon className='w-5 text-rose-400' />
        </div>
        <input type="text" placeholder='Search' className='bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md' />
      </div>
      

      {/* right */}
    <h1>right side</h1>
    </div>
  )
}
