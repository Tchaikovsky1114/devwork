/* eslint-disable @next/next/no-img-element */
import {app, db,auth} from '../../firebase'

import Header from '../../components/Header';
import Image from 'next/image';
import DevworkLogo from '../../public/devwork-logo.png';
import {getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth'
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';



export const Signin = () => {

  const router = useRouter()
  const signInGoogleHandler = async() => {

   try {
    // auth.languageCode = 'ko';
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const user = auth.currentUser?.providerData[0]
    const docRef = doc(db,'users', user!.uid)
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists() && user){
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        uid: user.uid,
        timestamp: serverTimestamp(),
        username: user.displayName?.split(" ").join("").toLowerCase()
      })
    }
    router.push("/")
   } catch (error) {
    const typedError = error as FirebaseError;
    const errorCode = typedError.code;
    const errorMessage = typedError.message;
    const credential = GithubAuthProvider.credentialFromError(typedError)
    console.error(errorMessage);
   }
  }



  const signInGithubHandler = async() => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth,provider);
      const user = auth.currentUser?.providerData[0]
    const docRef = doc(db,'users', user!.uid)
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists() && user){
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        uid: user.uid,
        timestamp: serverTimestamp(),
        username: user.displayName?.split(" ").join("").toLowerCase()
      })
    }
    router.push("/")
    } catch (error) {
      const typedError = error as FirebaseError;
      const errorCode = typedError.code;
      const errorMessage = typedError.message;
      const credential = GithubAuthProvider.credentialFromError(typedError)
      console.error(errorMessage);
    }
  }
  return (
    <>
      <Header />
      <div className="flex justify-center w-4/5 mx-auto items-center mt-20">
        <div className="mt-8 mr-8">
        <img
          className="hidden object-cover rotate-[9deg] md:inline-flex md:w-48"
          src="https://www.pngkey.com/png/full/338-3387462_image-instagram-feed-mockup.png"
          alt="devwork-auth-image"
        />
        </div>
        <div className="flex flex-col gap-10">
          <p className="text-sm italic my-10 text-center">
            Devwork for developer{"' "}s feedback{' '}
          </p>

          <div className="w-48 object-cover flex justify-center items-center">
            <Image src={DevworkLogo} alt="auth-image" />
          </div>
          <div className='flex flex-col items-center gap-[1px]'>
          
            <div  className="" >
              <div className="flex items-center space-x-2 p-2 border hover:bg-rose-400 hover:text-white duration-200 ease-out">
                <img
                  src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png'}
                  
                  alt="google logo"
                  className='w-6'
                />
              <button onClick={signInGoogleHandler} className="text-sm font-semibold rounded-md px-6 ">Sign in with Google</button>
            </div>
            <div className="flex items-center space-x-2 p-2 border hover:bg-rose-400 hover:text-white duration-200 ease-out">
                <img
                  src={'https://cdn-icons-png.flaticon.com/512/25/25231.png'}
                  
                  alt="google logo"
                  className='w-6'
                />
              <button onClick={signInGithubHandler} className="text-sm font-semibold rounded-md px-6 ">Sign in with GitHub</button>
            </div>
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
