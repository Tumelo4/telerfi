import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode; 
}

const Layout = (props: LayoutProps) => {
  return (
    <div className='p-2'>
      <Head>
        <title>Telerfi</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='m-auto w-full max-w-screen-2xl'>
        {props.children }
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout