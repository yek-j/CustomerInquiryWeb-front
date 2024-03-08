import React from "react";
import { boardCommentItemType } from "../../type/BoardCommentItemType";

const BoardCommentItem:React.FC<boardCommentItemType> = (props) => {
    return(
        <div className="flex items-start mx-10 rounded-xl border-2 border-gray-100 bg-white" >
            <div className="basis-1/12 p-5 bg-indigo-50">
                <span className="font-bold">{props.writer}</span>
            </div>
            <div className="basis-9/12 p-1 flex">
                {props.comment}
            </div>
            <div className="basis-2/12 self-end">
                <time
                    dateTime={props.date}
                    className="inline-block text-sm text-gray-500 transition pr-2" 
                >
                    {props.date}
                </time>
                <a
                    href="#"
                    className="inline-block text-sm text-gray-500 transition hover:text-gray-600 pr-2"
                >
                    수정
                </a>
                <a
                    href="#"
                    className="inline-block text-sm text-gray-500 transition hover:text-gray-600"
                >
                    삭제
                </a>
                
            </div>
        </div>
    );
}

export default BoardCommentItem;