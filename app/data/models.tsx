

export type DataPost = {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    text: string,
    type: string,
    url: string
}

export type DataComments = {
    by: string,
    id: number,
    kids: number[],
    parent: number,
    text: string,
    time: number,
    type: number,
    delete: boolean
}
