import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import BoardDetail from "../components/Board/BoardDetail";
import { BoardDetailType } from "../components/type/BoardItemType";
import Header from "../components/Common/Header";
import { fetchDeleteBoard, fetchUpdateResolved } from "../components/Board/BoardFetch";
import BoardForm from "../components/Board/BoardForm";
import BoardComment from "../components/Board/BoardComment/BoardComment";

const Board:React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [board, setBoard] = useState<BoardDetailType>({
        boardComment:[{writer:'', comment:'', date:''}],
        title: '',
        content: '',
        wdate: '',
        resolved: false,
        writerName: '',
        groupName: '',
        admin: 'user',
        edit: false,
    });
    const [updateComponent, setUpdateComponent] = useState(false);
    const [reload, setReload] = useState(false);

    const updateComponentHandler = () => {
        setUpdateComponent(true);
    }

    const updateCompleteHandler = () => {
        setUpdateComponent(false);
        setReload(!reload);
    }

    const backBtnHandler = () => {
        if (updateComponent) setUpdateComponent(false);
        else navigate("/");
    }

    const deleteBoardHandler = () => {
        if(id != undefined) {
            fetchDeleteBoard(id)
                .then(deleteOK => { if(deleteOK) navigate("/")});
        }
        else alert("undefined 삭제 실패") ;
    }

    const resolvedHandler = () => {
        if(id != undefined) {
            fetchUpdateResolved(id) 
                .then((saveOK) => {
                    if(saveOK) setReload(!reload);
                });
            }
        else alert("undefined 실패") ;
    }

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/board/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(res => {
            if(res.status === 200) {
                return res.json();
            } else {
                return res.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .then(data => {
            setBoard(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }, [reload]);

    return(
        <div>
            <Header admin={board.admin} />
            <div className="flex justify-end">
                <a className="group my-1 mr-10 relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500"
                    onClick={backBtnHandler}>
                    <span className="absolute inset-0 border border-current"></span>
                    <span
                        className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
                    >
                        돌아가기
                    </span>
                </a>
            </div>
                {!updateComponent && <BoardDetail board={board} resolved={resolvedHandler} update={updateComponentHandler} delete={deleteBoardHandler}/>}
            <div>
                <BoardComment id={id} comment={board.boardComment}/>
            </div>
            <div className="grid place-items-center">
                {updateComponent && <BoardForm id={id} change={updateCompleteHandler} board={{title:board.title, content:board.content}}/>}
            </div>
        </div>
    );
}

export default Board;