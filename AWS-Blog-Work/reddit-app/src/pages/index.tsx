import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import { Typography } from '@material-ui/core'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Typography variant='h1'>Hello World</Typography>
  )
}
