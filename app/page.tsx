// import { useEffect , useRef } from 'react'
import Post from './Components/Post/Post'

import Posts from './Components/Posts'


export default async function Home() {

    let res = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json", { next: { revalidate: 5}})
    let data: number[] = await res.json()
    
    return (
      <main className='py-24 px-14 space-y-5'>
          <Posts datas={data} />
      </main>
    )
}

