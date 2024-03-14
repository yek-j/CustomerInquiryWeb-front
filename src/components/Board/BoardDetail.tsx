import React from "react";
import { BoardDetailType } from "../type/BoardItemType";
import Button from "../Common/Button";
import BoardResolved from "./BoardResolved";
import DOMPurify from "dompurify";


type stateBoard = {
    board: BoardDetailType
    update: () => void,
    delete: () => void,
    resolved: () => void,
}

const BoardDetail:React.FC<stateBoard> = (props) => {

    return(
        <div className="rounded-xl border-2 border-gray-100 bg-white mx-10">
            <div className="flex items-start gap-4 p-4 flex-shrink-0 w-full pb-20">
                <div>
                    <p className="block font-bold sm:text-lg pb-4">
                        {props.board.title}
                    </p>
                    <p className="block line-clamp-2 text-md text-gray-700"
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.board.content)}}/>
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
                {!props.board.resolved && <BoardResolved click={props.resolved} class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-red-600 px-3 py-1.5 text-white" name={"미해결"} />}
                {props.board.resolved && <BoardResolved click={props.resolved} class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white" name={"해결"} />}

            </div>
        </div>
    );
}

export default BoardDetail;