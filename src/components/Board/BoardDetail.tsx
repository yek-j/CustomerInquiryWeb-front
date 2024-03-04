import React, {useEffect, useState} from "react";
import { BoardDetailType } from "../type/BoardItemType";
import Button from "../Common/Button";

type stateBoard = {
    board: BoardDetailType
    update: () => void,
    delete: () => void
}

const BoardDetail:React.FC<stateBoard> = (props) => {

    const [resolveClass, setResolveClass] = useState('-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white')

    useEffect(() => {
        if(!props.board.resolved) setResolveClass('-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-red-600 px-3 py-1.5 text-white');
    }, []);

    return(
        <div className="rounded-xl border-2 border-gray-100 bg-white mx-10">
            <div className="flex items-start gap-4 p-4 flex-shrink-0 w-full pb-20">
                <div>
                    <p className="block font-bold sm:text-lg pb-4">
                        {props.board.title}
                    </p>
                    <p className="block line-clamp-2 text-md text-gray-700">
                        {props.board.content}
                    </p>
                </div>
            </div>
            <div className="flex justify-end pb-6 pr-3">
                {
                    props.board.edit && 
                    <Button  str={"수정"} handler={props.update} class="mr-3 inline-block rounded-md bg-blue-200 px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"/>
                }
                {
                    props.board.edit && 
                    <Button  str={"삭제"} handler={props.delete} class="inline-block rounded-md bg-red-200 px-4 py-2 text-sm text-red-500 shadow-sm focus:relative"/>
                
                }
            </div>

            <div className="flex justify-end"> 
                <div className="pr-8">
                    <span
                        className="pr-2whitespace-nowrap rounded-full bg-indigo-300 px-2.5 py-0.5 text-xs text-purple-900"
                    >
                       그룹 : {props.board.groupName} / 작성자 : {props.board.writerName}
                    </span>
                </div>
                <strong
                    className={resolveClass}
                >
                    
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                    </svg>

                    <span className="text-[10px] font-medium sm:text-xs">
                        {
                            props.board.resolved ? "해결" : "미해결"
                        }
                                
                    </span>
                </strong>
            </div>
        </div>
    );
}

export default BoardDetail;