import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import BoardDetail from "../components/Board/BoardDetail";
import { BoardDetailType } from "../components/type/BoardItemType";
import Header from "../components/Common/Header";

const Board:React.FC = () => {

    const {id} = useParams();
    const [board, setBoard] = useState<BoardDetailType>({
        boardComment:[],
        title: '',
        content: '',
        wdate: '',
        resolved: false,
        writerName: '',
        groupName: '',
        admin: 'user',
        edit: false,
    });

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
    }, []);

    return(
        <div>
            <Header admin={board.admin}/>
            <BoardDetail board={board}/>
        </div>
    );
}

export default Board;