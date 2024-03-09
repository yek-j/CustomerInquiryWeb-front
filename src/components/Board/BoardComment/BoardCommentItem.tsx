import React, { ChangeEvent, FormEvent } from "react";
import { BoardCommentType } from "../../type/BoardCommentItemType";
import BoardCommentForm from "./BoardCommentForm";

type boardCommentItemType = {
    item: BoardCommentType,
    deleteHandle: (id:number) => void,
    updateSetHandle: (id:number) => void,
    updateSet: boolean,
    changeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    updateComment: (e: FormEvent) => void,
    updateForm: string
}

const BoardCommentItem:React.FC<boardCommentItemType> = (props) => {
    return(
        <div>
            <div className="flex items-start mx-10 my-1 rounded-xl border-2 border-gray-100 bg-white" >
                <div className="basis-1/12 p-5 bg-indigo-50">
                    <span className="font-bold">{props.item.writer}</span>
                </div>
                <div className="basis-9/12 p-1 flex">
                    {props.item.comment}
                </div>
                
                <div className="basis-2/12 self-end">
                    <time
                        dateTime={props.item.date}
                        className="inline-block text-sm text-gray-500 transition pr-2" 
                    >
                        {props.item.date}
                    </time>
                    <p
                        onClick={() => props.updateSetHandle(props.item.id)}
                        className="inline-block cursor-pointer text-sm text-gray-500 transition hover:text-gray-600 pr-2"
                    >
                        수정
                    </p>
                    <p
                        onClick={() => props.deleteHandle(props.item.id)}
                        className="inline-block cursor-pointer text-sm text-gray-500 transition hover:text-gray-600"
                    >
                        삭제
                    </p>
                    
                </div>
            </div>
            <div className="bg-gray-100  mx-10">
                {
                    props.updateSet && 
                    <BoardCommentForm changeComment={props.changeComment} comment={props.updateForm} saveComment={props.updateComment} />
                }
             </div>
        </div>
    );
}

export default BoardCommentItem;