'use client'

import Link from "next/link";
import Image from "next/image";
import Notifications from "./Notification";
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()
    const nav = [
        {lible: "stories", href: "/", isCurrentPath: pathname == "/"},
        {lible: "jobs", href: "/job", isCurrentPath: pathname == "/job"},
        {lible: "polls", href: "/poll", isCurrentPath: pathname == "/poll"},
    ]

    return (
        <header className="fixed inset-x-0 h-fit bg-orange-600 py-4 px-8  flex items-center justify-center text-white font-bold">
            <div className="mr-auto">
                <Link href="/" className="flex items-center justify-center space-x-4">
                    <Image src="/logo.svg" alt="logo of the page" width="32" height="32"/>
                    <h1 className="text-2xl">Hacker News</h1>
                </Link>
            </div>
            <nav>
                <ul className="flex space-x-4 items-center ">
                    {nav.map(current => <li key={current.href} className={current.isCurrentPath ? "text-white" : "text-white/80"}><Link href={current.href}>{current.lible}</Link></li>)}
                </ul>
            </nav>
        </header>
    )
}