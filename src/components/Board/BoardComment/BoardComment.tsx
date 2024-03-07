import React, { ChangeEvent, FormEvent, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import BoardCommentForm from "./BoardCommentForm";

type boardId = {
    id:string | undefined
}

const BoardComment:React.FC<boardId> = (props) => {
    const navigate = useNavigate();
    const [commentForm, setCommentForm] = useState({boardId:'', comment:''});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if(props.id === undefined) {
            alert('board id undefined 오류');
            navigate("/");
        } else {
            setCommentForm({
                ...commentForm,
                boardId: props.id
            });
        }
    }, [reload]);

    const commentSaveHandler = (e: FormEvent) => {
        e.preventDefault();
        
        fetch(import.meta.env.VITE_API_URL + '/add-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(commentForm)
        })
        .then(res => {
            if(res.status === 200) {
                setCommentForm({boardId:'', comment:''});
                setReload(!reload);
            } else {
                return res.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }

    const changeCommentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        
        setCommentForm({
            ...commentForm,
            comment: e.target.value,
        });
    }

    return(
        <div>
            <BoardCommentForm changeComment={changeCommentHandler} comment={commentForm.comment} saveComment={commentSaveHandler} />
        </div>
    );
}

export default BoardComment;