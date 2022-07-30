import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import UploadModal from '../components/UploadModal'
import { store } from '../store/index'
import {Provider} from 'react-redux'
const Home: NextPage = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default Home
