import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'

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
        <h1>List Page</h1>
    );
};

export default ListPage;