import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useUser } from '@/context/AuthContext'
import { listPosts } from '../graphql/queries'
import { API } from 'aws-amplify'
import { ListPostsQuery, Post } from '@/API'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {user} =useUser()
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(()=>{
    const fetchApiPost = async ()=>{
      const allPost = await API.graphql(
        { query: listPosts }
      ) as { data: ListPostsQuery, errors: any[]};

      if(allPost?.data){
        setPosts(allPost?.data?.listPosts?.items as Post[])
        return allPost?.data?.listPosts?.items as Post[];
      }else{
        throw new Error('Post Could not be Fetched')
      }
    }

    fetchApiPost()
  },[])

  console.log('homepage user:' , user)
  console.log('homepage posts:' , posts)
  return (
    <Typography variant='h1'>Hello World</Typography>
  )
}


