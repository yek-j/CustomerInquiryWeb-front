import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import Header from "../components/Common/Header";
import BoardList from "../components/Board/BoardList";

const ListPage:React.FC = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState("N");

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
            if(data.admin == "user" && data.group == "") {
                navigate("/admincheck");
            } else if(data.admin == "admin") {
                setAdmin(data.admin);
            }
        });
    }, []);
    return (
        <div className="grid place-items-center">
            <Header admin={admin}/>
            <BoardList />
        </div>
    );
};

export default ListPage;