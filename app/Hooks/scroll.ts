import { useEffect, useState } from "react"
import { throttle } from "lodash";


export default function useScroll(dataChunk: number[][]) {
    let [currentPosition, setCurrentPosition] = useState<number>(0)
    let [scrollPercentage, setScrollPercentage] = useState<number>(0)
    
    useEffect(() => {
        
        function handleScroll() {
            let scrollY = window.scrollY;
            let windowHeight = window.innerHeight;
            let documentHeight = document.body.scrollHeight;
        
            const scrollPrtg = documentHeight - windowHeight == 0 ? 0 : (scrollY / (documentHeight - windowHeight)) * 100;
            // setScrollPercentage(() => scrollPrtg)
            
            if (scrollPrtg > 85 && currentPosition <= dataChunk.length) setCurrentPosition(current => current + 1)
            else if (scrollPrtg < 10) setCurrentPosition(() => 0)
        }
        
        const throttledScroll = throttle(
            handleScroll,
            400,
            { leading: false, trailing: true },
        );
        window.addEventListener("scroll", throttledScroll);

        return () => removeEventListener("scroll", throttledScroll);
    }, [currentPosition])

    return currentPosition
}