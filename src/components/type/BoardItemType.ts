interface BoardType {
    writerName: string;
    groupName: string;
    title: string;
    wdate: string;
    resolved: boolean
}

export type BoardItemType = BoardType &  {
    id: number,
    preview: string,
}

export type BoardPageType = {
    list: [BoardItemType],
    total: number,
}

export type BoardDetailType = BoardType & {
    boardComment: [],
    content: string,
    admin: string,
    edit: boolean,
}

