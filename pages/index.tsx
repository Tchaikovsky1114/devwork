import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import Feed from '../components/Feed'
import Header from '../components/Header'
import UploadModal from '../components/UploadModal'
import { auth, db } from '../firebase'
import { useAppDispatch, useAppSelector } from '../store'
import { currentUserHandler } from '../store/slice/UserSlice';
const Home: NextPage = () => {
  const currentUser = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
 
 console.log(auth.currentUser) 
  useEffect(() => {
    if(auth.currentUser){
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
    })
  }
  }, [dispatch]);
  

  return (
    
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Devwork App</title>
        <meta name='description' content='something' />
      </Head>
    {/* Header */}
    <Header />
    {/* Feed */}
    <Feed />
    {/* Modal */}
    <UploadModal />
    </div>

  )
}

export default Home
