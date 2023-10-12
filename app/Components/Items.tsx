import Image from "next/image"

interface PropsParams {
    lible: string | number,
    src: string,
    alt: string
}

export default function({lible, src, alt}: PropsParams) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <Image src={src} alt={alt} height="24" width='24'/>
            <span>{lible}</span>
        </div>
    )
}