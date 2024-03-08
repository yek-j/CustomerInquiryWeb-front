import { boardCommentItemType } from "./BoardCommentItemType";

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
    list: BoardItemType[],
    total: number,
}

export type BoardDetailType = BoardType & {
    boardComment: boardCommentItemType[],
    content: string,
    admin: string,
    edit: boolean,
}

export type SaveBoard = {
    title: string,
    content: string,
}