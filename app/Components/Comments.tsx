import Link from 'next/link'
import Items from './Items'
import formatTimestamp from '@/app/Utils/formateTime'
import { DataComments, DataPost } from '@/app/data/models'

export default function Comments({ by, id, kids, parent, text, time, type } : DataComments ) {
  return (
    <div className="bg-zinc-200/50 w-full h-fit p-8 rounded-md shadow-lg space-y-4">
        <div className="pt-4 flex items-center space-x-4">
            <Items src='/avatar_svg.svg' alt='public by' lible={by}/>
            <Items src="/time.svg" alt='time since publication' lible={formatTimestamp(time)}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: text || "" }} className='block space-y-2' />
        <div className="w-fit h-fit py-1 px-4 rounded-md bg-orange-500 text-white font-bold">
            <span>{type}</span>
        </div>
        
        <div className="border-t-2 border-black/5 mt-4 pt-4 space-x-4 flex items-center">
            <Items src="/poll.svg" alt='poll' lible={0}/>
            <Items src="/comments.svg" alt='number of comments' lible={kids?.length  || 0}/>
        </div>
    </div>
  )
}
