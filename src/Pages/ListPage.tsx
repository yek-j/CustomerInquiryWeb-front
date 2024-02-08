import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "../components/UI/Header";

const ListPage:React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/', {
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
            }
        });
    }, []);
    return (
        <div className="grid place-items-center">
            <Header />
            <h1>List Page</h1>

        </div>
    );
};

export default ListPage;