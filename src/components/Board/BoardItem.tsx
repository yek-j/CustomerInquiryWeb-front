// BoardList에서 표시되는 게시판 내용
import React from "react";
import { BoardItemType } from "../type/BoardItemType";

type item = {
    item: BoardItemType
}

const BoardItem: React.FC<item> = (props) => {

    return (
        
        <div
            key={props.item.id}
            className="mx-10 mb-4 hover:animate-background rounded-xl bg-indigo-200 p-0.5 shadow-xl transition hover:bg-indigo-700 hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
            <div className="rounded-[10px] bg-white p-4 ">
                <a href="#">
                    <p className="mt-0.5 text-lg font-bold text-gray-900">
                        {props.item.title}
                    </p>
                    <p className="text-sm">
                        {props.item.preview}
                    </p>
                </a>

                <div className="mt-4 flex flex-wrap gap-1">
                    <span
                        className="whitespace-nowrap rounded-full bg-indigo-200 px-2.5 py-0.5 text-xs text-purple-900"
                    >
                        그룹 : {props.item.groupName}
                    </span>

                    <span
                        className="whitespace-nowrap rounded-full bg-indigo-300 px-2.5 py-0.5 text-xs text-purple-900"
                    >
                        작성자 : {props.item.writerName}
                    </span>

                    {
                        props.item.resolved ? 
                    
                        <span
                            className="whitespace-nowrap rounded-full bg-green-200 px-2.5 py-0.5 text-xs text-teal-900"
                        >
                            해결
                        </span> : 
                        <span
                        className="whitespace-nowrap rounded-full bg-rose-200 px-2.5 py-0.5 text-xs text-rose-900"
                        >
                            미해결
                        </span>
                    }
                </div>
                <div>
                    <time dateTime={props.item.wdate} className="block text-xs text-gray-500 pt-2"> {props.item.wdate} </time>
                </div>
            </div>
        </div>
        
    );
}

export default BoardItem;