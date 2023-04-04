import '@/styles/globals.css'
import Router from 'next/router';
import Head from 'next/head';
import { NProgress } from 'nprogress';
import {ChakraProvider} from '@chakra-ui/react'; 
import Navbar from '@/components/Navbar';

import Layout from '../components/Layout'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      </Head> 
      <ChakraProvider>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App;
