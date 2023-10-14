'use client'

import { useEffect, useState, useMemo } from "react";
import useScroll from "../Hooks/scroll";
import Post from "./Post/Post";
import { Data } from '@/app/data/models'
import { chunk } from 'lodash' 
import useNotification from "../Hooks/notifications";
import Notifications from "./Navbar/Notification"; 

export default function Posts({ datas }: {datas: number[]}) {

    const [ids, isDisplayed, handleNotification] = useNotification("https://hacker-news.firebaseio.com/v0/newstories.json", datas)
    const dataChunked = useMemo(() => chunk(ids, 10), [ids]);
    const [postData, setPostData] = useState<{ [key: number]: JSX.Element }>({});
    const currentPosition = useScroll(dataChunked);
  
    useEffect(() => {
    
        const fetchData = async () => {
            const newPostData: { [key: string]: JSX.Element } = {};

            await Promise.all(
                dataChunked[currentPosition]?.map(async (id) => {
                    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
                        cache: "no-store"
                    });
        
                    const data: Data = await res.json();
                    newPostData[id] = <Post key={id} {...data} />;
                }) || []
            );
    
            setPostData((prevData) => ({ ...newPostData, ...prevData }));
        };
    
        fetchData();
    }, [currentPosition, dataChunked]);
  
    return (
        <>
            {isDisplayed && <Notifications onClick={handleNotification} />}
            {Object.values(postData).reverse()}
        </>
    )
}
  


