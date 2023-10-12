'use client'

import { useEffect, useState, useMemo } from "react";
import useScroll from "../Hooks/scroll";
import Post from "./Post/Post";
import { Data } from '@/app/data/models'
import { chunk } from 'lodash' 

type PropsParams = {
    ids: number[]
}

export default function Posts({ids} : PropsParams) {
    let dataChunked = useMemo(() => chunk(ids, 10), [ids])
    let [datas, setDatas] = useState<JSX.Element[]>([])
    let currentPosition = useScroll()

    useEffect(() => {
        dataChunked[currentPosition].map(async (id) => {
            let res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {cache: "no-store"})
            let data: Data = await res.json()

            setDatas(value => [...value, <Post key={id} {...data} />])
        })

    }, [currentPosition])


    return (
        <>
            {datas}
        </>
    )
}


