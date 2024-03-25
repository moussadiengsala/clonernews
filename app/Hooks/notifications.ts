import { MouseEventHandler, useEffect, useState } from "react";

export default function useNotification(url: string, data: number[]): ([number[], boolean, () => Promise<void>]) {
    let [ids, setIds] = useState<number[]>(data)
    let [newIds, setNewIds] = useState<number[]>(data)
    let [isDisplayed, setIsDisplayed] = useState<boolean>(false)

    // MouseEventHandler<HTMLButtonElement> | undefined
    async function handleNotification() {
        window.scrollTo({top: 0, behavior: "smooth"})
        let res = await fetch(url)
        let newId: number[] = await res.json()

        setNewIds(() => newId)
        setIds(() => newId)
        setIsDisplayed(() => false)
    }

    useEffect(() => {

        const fetchData = async () => {
            
            if (newIds.length !== ids.length || !newIds.every((item, index) => item === ids[index])) {
                setIsDisplayed(() => true)
            } else {
                let res = await fetch(url)
                let newId: number[] = await res.json()

                setNewIds(() => newId)
            }
        }

        // Fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [newIds, isDisplayed])

    return [ids, isDisplayed, handleNotification]
}
