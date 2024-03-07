import React, { ChangeEvent, FormEvent } from "react";

type BoardCommentFormType = {
    comment: string,
    saveComment: (e: FormEvent) => void,
    changeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const BoardCommentForm:React.FC<BoardCommentFormType> = (props) => {
    
    
    return(
        <form onSubmit={props.saveComment} className="flex items-start p-6 ml-5 ">
            <div className="w-5/6">
                <label className="sr-only" htmlFor="comment">댓글 작성</label>
                <textarea
                    className="w-full rounded-lg border-gray-200 p-3"
                    placeholder="댓글 작성"
                    rows={2}
                    id="comment"
                    name="comment"
                    value={props.comment}
                    onChange={props.changeComment}
                />
                
            </div>
            
            <div className="w-1/6">
                <button
                    type="submit"
                    className="mx-2.5 text-md rounded-lg bg-indigo-500 px-6 py-6 font-medium text-white sm:w-auto"
                    >
                    저장
                </button>
            </div>
        </form>
    );
}

export default BoardCommentForm;