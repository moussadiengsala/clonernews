'use client'

import { MouseEventHandler } from "react"

export default function Notifications({onClick} : {onClick: () => Promise<void>}) {
    return (
        <button onClick={onClick} className="fixed bg-orange-600 w-fit h-fit py-4 px-8 text-white top-[80px] left-1/2 transform -translate-x-1/2 transition-all shadow-2xl cursor-pointer">
            <span>News</span>
        </button>
    )
}