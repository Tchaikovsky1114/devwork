import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import UploadModal from '../components/UploadModal'

const Home: NextPage = () => {
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
