// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Amplify, Auth} from 'aws-amplify'
import awsconfig from "../aws-exports"
import AuthContext from '@/context/AuthContext';

Amplify.configure({...awsconfig, ssr:true});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  )
}
