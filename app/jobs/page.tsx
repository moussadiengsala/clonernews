import Posts from "../Components/Posts"


export default async function Jods() {
 
    let res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json", { next: { revalidate: 5}})
    let data: number[] = await res.json()
    
    return (
        <main className='py-24 px-14 space-y-5'>
            <Posts datas={data} url="https://hacker-news.firebaseio.com/v0/jobstories.json" />
        </main>
    )
}
