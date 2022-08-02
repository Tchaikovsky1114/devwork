import React, { useEffect } from 'react';
import Image from 'next/image';
import DevWorkLogo from '../public/devwork-logo.png';
import DevWorkMiniLogo from '../public/devwork-minilogo.png';
import { SearchIcon, PlusCircleIcon, HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store';
import { modalToggle } from '../store/slice/UploadSlice';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { currentUserHandler } from '../store/slice/UserSlice';
import { signOut as nextSignOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.upload);
  const currentUser = useAppSelector((state) => state.user);
  const navigate = useRouter()
  const signInHandler = () => {
    navigate.push("/auth/signin");
  };

  const signOutHandler = async () => {
    
    nextSignOut()
    
  };

  const modalToggleHandler = () => {
    dispatch(modalToggle({ isOpen: !isOpen }));
  };
  const backToHomeHandler = () => {
    router.push('/');
  };

  useEffect(() => {
    if(!auth.currentUser) return;
    onAuthStateChanged(auth, (user) => {
      const uid = auth.currentUser!.providerData[0].uid;
      if (user) {
        (async () => {
          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(currentUserHandler(docSnap.data()));
          }
        })()
      }
    });
  }, [dispatch]);
  
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
            onClick={backToHomeHandler}
          />
        </div>

        <div className="cursor-pointer h-10 w-10 relative lg:hidden">
          <Image
            src={DevWorkMiniLogo}
            alt="logo"
            layout="fill"
            className="object-contain"
            onClick={backToHomeHandler}
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
          <HomeIcon
            onClick={backToHomeHandler}
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
          />
          {currentUser.user!.username ? (
            <>
              <PlusCircleIcon
                onClick={modalToggleHandler}
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
              />
              <div className="w-6 h-6 ring-yellow-400 ring rounded-full cursor-pointer relative overflow-hidden ring-offset-2">
                <img
                  src={currentUser.user!.userImage}
                  onClick={signOutHandler}
                  alt="currentuser-image"
                />
              </div>
            </>
          ) : (
            <button onClick={signInHandler}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
