export type BoardItemType = {
    id: number,
    writerName: string,
    groupName: string,
    title: string,
    preview: string,
    wdate: string,
    resolved: boolean
}

export type BoardPageType = {
    list: [BoardItemType],
    total: number,
}