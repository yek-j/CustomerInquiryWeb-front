import React from "react";
import BoardCommentForm from "./BoardCommentForm";

const BoardComment:React.FC = () => {

    const commentSaveHandler = () => {

    }

    return(
        <div>
            <BoardCommentForm saveComment={commentSaveHandler} />
        </div>
    );
}

export default BoardComment;