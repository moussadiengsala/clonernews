'use client'

import { useEffect, useState, useMemo } from "react";
import useScroll from "../Hooks/scroll";
import Post from "./Post/Post";
import { Data } from '@/app/data/models'
import { chunk } from 'lodash' 

type PropsParams = {
    ids: number[]
}


export default function Posts({ ids }: PropsParams) {
    const dataChunked = useMemo(() => chunk(ids, 10), [ids]);
    const [postData, setPostData] = useState<{ [key: string]: JSX.Element }>({});
    const currentPosition = useScroll();
  
    useEffect(() => {
        console.log("hello world!");
    
        const fetchData = async () => {
            const newPostData: { [key: string]: JSX.Element } = {};
    
            await Promise.all(
            dataChunked[currentPosition].map(async (id) => {
                const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
                cache: "no-store"
                });
    
                const data: Data = await res.json();
                newPostData[id] = <Post key={id} {...data} />;
            })
            );
    
            setPostData((prevData) => ({ ...prevData, ...newPostData }));
        };
    
        fetchData();
    }, [currentPosition, dataChunked]);
  
    return <>{Object.values(postData)}</>;
}
  


