
import Link from 'next/link'
import Items from '../Items'
import getColor from '@/app/Utils/getColor'
import { Data } from '@/app/data/models'


export default function Post({by, descendants, id, kids, score, time, title,   text, type, url}: Data) {
    return (
        <div className="bg-white w-full h-fit p-8 rounded-md shadow-lg space-y-4">
            <Link href={url || "#"} target="_blank"><h2 className="text-2xl capitalize font-bold">{title}</h2></Link>
            <p>{text || ""}</p>
            <div className="w-fit h-fit py-1 px-4 rounded-md bg-orange-500 text-white font-bold">
                <span>{type}</span>
            </div>
            <div className="pt-4 flex items-center space-x-4">
                <Items src='/avatar_svg.svg' alt='public by' lible={by}/>
                <Items src="/time.svg" alt='time since publication' lible={time}/>
            </div>
            <div className="border-t-2 mt-4 pt-4 space-x-4 flex items-center">
                <Items src="/poll.svg" alt='poll' lible={score}/>
                <Link href="/">
                    <Items src="/comments.svg" alt='number of comments' lible={kids?.length  || 0}/>
                </Link>
            </div>
        </div>
    )
}