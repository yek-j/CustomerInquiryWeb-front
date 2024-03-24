import React, { ChangeEvent, FormEvent, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import BoardCommentForm from "./BoardCommentForm";
import BoardCommentItem from "./BoardCommentItem";
import { BoardCommentType } from "../../type/BoardCommentItemType";
import { fetchCommentList, fetchDeleteComment, fetchSaveComment, fetchUpdateComment } from "./BoardCommentFetch";

type boardCommentParam = {
    id:string | undefined,
}

const BoardComment:React.FC<boardCommentParam> = (props) => {
    const navigate = useNavigate();
    const [commentForm, setCommentForm] = useState({boardId:'', comment:''});
    const [commentUpdateForm, setCommentUpdateForm] = useState({commentId:0, comment:''});
    const [reload, setReload] = useState(false);
    const [commentList, setCommentList] = useState<BoardCommentType[]>([{id: 0, writer:'', comment:'', date:''}]);

    const [updateId, setUpdateId] = useState(0);

    useEffect(() => {
        if(props.id === undefined) {
            alert('board id undefined 오류');
            navigate("/");
        } else if(commentForm.boardId == '') {
            setCommentForm({
                ...commentForm,
                boardId: props.id
            });
        } 

        if(props.id != undefined) {
            fetchCommentList(props.id)
            .then((data) => {
                setCommentList(data);
            });
        }
    }, [reload]);

    const commentSaveHandler = (e: FormEvent) => {
        e.preventDefault();
        
        fetchSaveComment(commentForm)
            .then((saveOK) => {
                if(saveOK) {
                    setCommentForm({boardId:'', comment:''});
                    setReload(!reload);
                } 
            });
    }
    
    const deleteCommentHandler = (id: number) => {
        if(confirm("삭제하겠습니까?") === true) {
            
            fetchDeleteComment(id)
                .then(deleteOk => {
                    if(deleteOk) {
                        const result = commentList.filter(item => item.id !== id);
                        setCommentList(result);
                    }
                });
        
        }
    }
    const changeCommentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentForm({
            ...commentForm,
            comment: e.target.value,
        });
    }


    /* update */
    const updateCommentHandler = (id: number) => {
        if(updateId == id) setUpdateId(0);
        else setUpdateId(id);
    }

    const changeCommentUpdateHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentUpdateForm({
            commentId: updateId,
            comment: e.target.value,
        });
    }

    const saveCommentUpdateHandler = (e: FormEvent) => {
        e.preventDefault();
        
        fetchUpdateComment(commentUpdateForm)
            .then((saveOK) => {
                if(saveOK) {
                    const result = commentList.map(item => 
                        item.id === updateId ? {...item, comment:commentUpdateForm.comment} : item);
                    setCommentList(result);
                    setUpdateId(0)
                    setCommentUpdateForm({commentId:0, comment:''});
                } 
            });
    }
    /* -------- */

    return(
        <div>
            <BoardCommentForm changeComment={changeCommentHandler} comment={commentForm.comment} saveComment={commentSaveHandler} />
            {
                commentList.map((object) => (
                    <BoardCommentItem key={object.id} item={object} deleteHandle={deleteCommentHandler} updateSetHandle={updateCommentHandler}
                        updateSet={object.id === updateId} updateForm={commentUpdateForm.comment} changeComment={changeCommentUpdateHandler} updateComment={saveCommentUpdateHandler}
                    />
                ))

            }
        </div>
    );
}

export default BoardComment;