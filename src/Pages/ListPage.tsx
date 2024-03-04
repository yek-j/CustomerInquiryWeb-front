import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import Header from "../components/Common/Header";
import BoardList from "../components/Board/BoardList";
import BoardForm from "../components/Board/BoardForm";
import Button from "../components/Common/Button";

const ListPage:React.FC = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState("N");
    const [writeMode, setWriteMode] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("token") == null) navigate("/signin");
        fetch(import.meta.env.VITE_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.admin == "user" && data.group == null) {
                navigate("/admincheck");
            } else if(data.admin == "admin") {
                setAdmin(data.admin);
            }
        });
    }, []);

    const changeWriteMode = () => {setWriteMode(true);}
    const changeViewMode = () => {setWriteMode(false);}

    return (
        <div className="grid place-items-center">
            <Header admin={admin}/>
            <div>
                <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                    <Button
                        class={"inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"}
                        str={"글쓰기"}
                        handler={changeWriteMode}
                    />

                    <Button
                        class={"inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"}
                        str={"게시글"}
                        handler={changeViewMode}
                    />
                </span>
            </div>
            <div className="w-full">
                {!writeMode && <BoardList />}
                
                {writeMode && <BoardForm id={""} change={() => {}} board={null}/>}
            </div>

        </div>
    );
};

export default ListPage;